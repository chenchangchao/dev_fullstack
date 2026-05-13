import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as dotenv from 'dotenv';


dotenv.config({ path: '.env' });
const port = process.env.PORT || '3000'; 
const localIp = 'localhost'; // 本地地址
const publicIp = process.env.PUBLIC_IP || '';

// Fastify本身不支持在同一实例上同时监听多个IP地址和端口,
// 需要通过其他方式来实现这个需求，比如使用反向代理服务器或者多实例监听不同的IP地址和端口。
async function bootstrap_local() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
 // 监听本地地址
 await app.listen(port, localIp, () => {
  console.log(`Server is running locally on http://${localIp}:${port}.`);
});
}

async function bootstrap_public() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
// 如果有指定公网 IP 地址，则同时监听公网 IP 地址
if (publicIp) {
  await app.listen(port, publicIp, () => {
    console.log(`Server is running on public IP http://${publicIp}:${port}.`);
  });
}
}
bootstrap_local();
bootstrap_public();
