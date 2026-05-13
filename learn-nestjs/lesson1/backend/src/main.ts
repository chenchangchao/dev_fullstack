import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import chalk  from 'chalk';

// 载入环境变量
dotenv.config({ path: '.env' });
const port = process.env.PORT || '3000'; 
// const port = parseInt(process.env.PORT,4) || 3000; 
// const ip = process.env.CLIENT_HOST || 'localhost'; // 或者指定为服务器的公网 IP 地址

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port,()=>{
    // console.log(chalk.blue.bold(`Server is running on http://${ip}:${port}.`));
    // console.log(`Server is running on http://${ip}:${port}.`);
    console.log(`Server is running on PORT:${port}.`);
    // console.log(chalk.blue.bold(`Server is running on PORT:${port}.`));
  });
}
bootstrap();
