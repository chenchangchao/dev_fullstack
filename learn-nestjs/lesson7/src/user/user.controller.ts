import {
  Controller,
  Get,
  Query,
  Request,
  Response,
  Render,
  Post,
  Body,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express'; // Import Request type
// import { CreateUserDto } from './dto/create-user.dto'; // Import the appropriate DTO
interface IQueryParams {
  id: number;
  name: string;
}

@Controller('user')
export class UserController {
  //@Get()
  //index() {
  // return '用户中心';
  //}
 
  @Get()
  @Render('default/user')
  index() {
    return { name: '张三' };
  }

  @Get('cookie')
  getCookie(@Request()  req){
    console.log(req.cookies);
    console.log(req.signedCookies);
    // return req.cookies.username; //未加密cookie
    return req.signedCookies.username; //加密的cookie
    // return '获取cookie';
  }

  // 通过@Query装饰器获取get传值  http://localhost:3000/user/add?id=123&name=zhangsan
  @Get('add')
  addData(@Query() query: IQueryParams) {
    console.log(query);
    return query;
  }

  // 通过Request装饰器获取get传值
  @Get('edit')
  editData(@Request() request: ExpressRequest) {
    console.log(request.query);
    return '通过Request获取get传值';
  }

  // 通过@Body()装饰器获取post传值
  @Post('create')
  createData(@Body() body) {
    console.log('触发了post');
    console.log(body);
    return '我是POST方法';
  }

  @Post('doAdd')
  doAdd(@Body() body, @Response() res) {
    console.log(body);
    res.redirect('/user'); //路由跳转
  }
}
