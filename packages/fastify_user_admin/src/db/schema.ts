import { pgTable, uuid, varchar, timestamp, customType, pgEnum } from 'drizzle-orm/pg-core';

// 1. 定义角色枚举
export const roleEnum = pgEnum('user_role', ['admin', 'editor', 'viewer']);

// 2. 自定义 bytea 类型 (Drizzle 官方对 bytea 的支持需要稍微包装一下)
const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
  dataType() {
    return 'bytea';
  },
});

// 3. 用户表
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(), // 改为邮箱登录
  passwordHash: varchar('password_hash', { length: 255 }), // 留空则代表可能是纯 OAuth 登录用户
  role: roleEnum('role').default('viewer').notNull(),
  
  // 预留给 Phase 2 的字段 (先注释掉或者留着)
  // githubId: varchar('github_id', { length: 255 }).unique(),
  // googleId: varchar('google_id', { length: 255 }).unique(),
  // avatarUrl: varchar('avatar_url', { length: 1024 }), 
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 4. 用户头像表 (本地存储)
export const userAvatars = pgTable('user_avatars', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }), // 级联删除：账号注销时自动删除头像
  fileName: varchar('file_name', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 50 }).notNull(),
  imageData: bytea('image_data').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});