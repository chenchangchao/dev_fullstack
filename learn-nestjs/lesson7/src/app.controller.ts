import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

//http://localhost:3000/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('default/index')//模板引擎渲染路径
  getHello() {
    return { name: '张三', age: '20' };
  }
}
