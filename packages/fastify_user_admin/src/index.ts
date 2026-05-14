// src/index.ts
import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';
import { join } from 'path';
import { eq } from 'drizzle-orm';
import multipart from '@fastify/multipart';
import { userAvatars } from './db/schema'; // 确保引入了头像表 schema

import { db } from './db/index';
import { users } from './db/schema';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

const app = Fastify({ logger: true });

// --- 1. 读取 RSA 密钥 ---
const privateKey = readFileSync(join(process.cwd(), 'certs', 'private.key'), 'utf8');
const publicKey = readFileSync(join(process.cwd(), 'certs', 'public.key'), 'utf8');

// --- 2. 注册插件 ---
// app.register(cors, { origin: '*' }); // 允许跨域
app.register(cors, { 
  origin: '*', // 开发环境允许所有源
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // 显式放行我们用到的所有 HTTP 方法
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],   // 显式放行 Token 和内容类型表头
});

// 配置基于非对称加密的 JWT
app.register(fastifyJwt, {
  secret: {
    private: privateKey,
    public: publicKey,
  },
  sign: { algorithm: 'RS256', expiresIn: '7d' }, // 使用 RS256 算法，设置 7 天过期
});

// 注册 multipart 插件，限制最大 5MB
app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024,
  }
});

// 验证 Token 的钩子 (中间件)
app.decorate('authenticate', async (request: any, reply: any) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: 'Unauthorized', message: 'Token 无效或已过期' });
  }
});

// --- 3. 路由接口 ---

// 【用户注册】
app.post('/api/users/register', async (request, reply) => {
  const { email, password } = request.body as any;

  if (!email || !password) {
    return reply.code(400).send({ error: '邮箱和密码不能为空' });
  }

  // 检查邮箱是否已存在
  const existingUser = await db.select().from(users).where(eq(users.email, email));
  if (existingUser.length > 0) {
    return reply.code(409).send({ error: '该邮箱已被注册' });
  }

  // 密码加密
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  // 存入数据库
  const [newUser] = await db.insert(users).values({
    email,
    passwordHash,
    role: 'viewer', // 默认角色
  }).returning(); // 返回刚插入的数据
  if (!newUser) {
    return reply.code(500).send({ error: '用户注册失败' });
  }

  return reply.code(201).send({
    message: '注册成功',
    userId: newUser.id
  });
});

// 【用户登录】
app.post('/api/users/login', async (request, reply) => {
  const { email, password } = request.body as any;

  // 查找用户
  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user || !user.passwordHash) {
    return reply.code(401).send({ error: '邮箱或密码错误' });
  }

  // 校验密码
  const isMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!isMatch) {
    return reply.code(401).send({ error: '邮箱或密码错误' });
  }

  // 签发 JWT Token (包含 userId 和 role)
  const token = app.jwt.sign({ userId: user.id, role: user.role });

  return reply.send({
    message: '登录成功',
    token,
    user: { id: user.id, email: user.email, role: user.role }
  });
});
app.get('/api/health', async (request, reply) => {
  return reply.send({
    status: 'ok',
    message: request.url + 'Health check passed'
  });
});
// 【测试鉴权接口】: 获取个人信息
app.get('/api/users/me', { preValidation: [app.authenticate] }, async (request, reply) => {
  // 走到这里说明 token 验证通过，request.user 中有 payload 数据
  const [user] = await db.select().from(users).where(eq(users.id, request.user.userId));

  if (!user) {
    return reply.code(404).send({ error: '用户不存在' });
  }

  return reply.send({ id: user.id, email: user.email, role: user.role });
});

// 【上传/更新头像】(需要 Token)
// 路径支持 /api/avatars（改自己）或 /api/avatars/:userId（替别人改）
app.put('/api/avatars/:userId?', { preValidation: [app.authenticate] }, async (request, reply) => {
  const params = request.params as { userId?: string };
  const currentUserId = request.user.userId;
  const currentUserRole = request.user.role;

  // 确定最终要操作的目标用户 ID
  const targetUserId = params.userId || currentUserId;

  // RBAC 越权拦截：如果操作的不是自己的 ID，且自身不是 admin，则拒绝
  if (targetUserId !== currentUserId && currentUserRole !== 'admin') {
    return reply.code(403).send({ error: 'Forbidden', message: '无权修改他人的头像' });
  }

  // 获取上传的文件流
  const data = await request.file();
  if (!data) {
    return reply.code(400).send({ error: 'Bad Request', message: '未找到上传的文件' });
  }
  // 👉 加上这一句打印日志
  console.log('接收到的文件信息:', {
    filename: data.filename,
    mimetype: data.mimetype
  });
  // 将文件流转为 Buffer，准备存入 PG 的 bytea 字段
  const buffer = await data.toBuffer();
  const mimeType = data.mimetype;
  const fileName = data.filename;

  // 提取文件后缀并转小写 (比如 'jpg', 'png')
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  const validExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

  // 双保险：mimetype 是 image 开头，或者后缀名是合法的图片后缀
  const isImageMime = mimeType.startsWith('image/');
  const isValidExt = validExts.includes(ext);

  if (!isImageMime && !isValidExt) {
    return reply.code(400).send({ 
      error: 'Bad Request', 
      message: `不支持的文件类型，当前 mimetype: ${mimeType}, 后缀: ${ext}` 
    });
  }

  // 只允许上传图片
  if (!mimeType.startsWith('image/')) {
    return reply.code(400).send({ error: 'Bad Request', message: '只允许上传图片文件' });
  }

  // 使用 Drizzle 的 Upsert 语法：如果不存在就插入，如果 userId 冲突就更新
  await db.insert(userAvatars).values({
    userId: targetUserId,
    fileName,
    mimeType,
    imageData: buffer,
    updatedAt: new Date()
  }).onConflictDoUpdate({
    target: userAvatars.userId,
    set: {
      fileName,
      mimeType,
      imageData: buffer,
      updatedAt: new Date()
    }
  });

  return reply.send({ message: '头像上传成功', userId: targetUserId });
});


// 【获取头像】(公开接口，前端 <img> 标签直接调用)
app.get('/api/avatars/:userId', async (request, reply) => {
  const { userId } = request.params as { userId: string };

  // 从数据库中查找头像数据
  const [avatar] = await db.select().from(userAvatars).where(eq(userAvatars.userId, userId));

  if (!avatar || !avatar.imageData) {
    // 如果没有自定义头像，可以选择返回 404，或者重定向/返回一个默认的 SVG 字符串
    return reply.code(404).send({ error: 'Not Found', message: '用户尚未设置头像' });
  }

  // 关键：设置 Content-Type，让浏览器直接将其识别为图片而不是下载文件
  reply.header('Content-Type', avatar.mimeType);

  // 直接发送 Buffer 数据
  return reply.send(avatar.imageData);
});
// --- 4. 启动服务 ---
const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server is running at http://localhost:3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();