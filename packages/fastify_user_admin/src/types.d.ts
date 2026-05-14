// src/types.d.ts
import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string; role: 'admin' | 'editor' | 'viewer' }; // 你在这个 payload 里放什么，这里就定义什么
    user: { userId: string; role: 'admin' | 'editor' | 'viewer' }; 
  }
}