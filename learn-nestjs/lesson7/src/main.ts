import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets('public'); //配置静态资源目录

  // app.useStaticAssets('public', {   //配置虚拟目录
  //   prefix: '/static/'
  // })

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/', //配置虚拟目录
  });

  // 配置cookie中间件
  // app.use(cookieParser());
  app.use(cookieParser('This is signed cookies'));

  app.use(expressSession({
    secret: 'keyboard cat',//session加密的密钥
    cookie: { maxAge: 1000 * 15 },
    resave: false,
    saveUninitialized: false
  }))
  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();

