import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// 检查环境变量
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env');
}

// 使用 postgres.js 创建查询客户端
// 注意：在本地开发时，max connections 可以稍微设大一点
const queryClient = postgres(process.env.DATABASE_URL, { max: 10 });

// 实例化 drizzle，并传入 schema 以便获得完美的类型推导
export const db = drizzle(queryClient, { schema });