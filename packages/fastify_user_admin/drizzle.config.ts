import { defineConfig } from 'drizzle-kit';

declare const process: {
  env: {
    DATABASE_URL?: string;
  };
};

export default defineConfig({
  schema: './src/db/schema.ts', // 你的 schema 文件路径
  out: './drizzle',             // 生成的迁移 SQL 存放目录
  dialect: 'postgresql',        // 数据库方言
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});