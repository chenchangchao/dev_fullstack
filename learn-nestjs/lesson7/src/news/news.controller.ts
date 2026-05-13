import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { NewsService } from './news.service';
@Controller('news')
export class NewsController {
  //http://localhost:3000/news/adda
  constructor(private newsServices: NewsService) {}
  @Get()
  @Render('default/news')
  index() {
    // console.log(this.newsServices.findAll())
    return {
      newsList: this.newsServices.findAll(),
    }
  }
  @Get('a*a')
  indexA() {
    return '新闻增加 模糊匹配';
  }

  @Get('add')
  addData(@Query('id') id) {
    console.log(id);
    return '新闻增加';
  }
  //获取动态路由   http://localhost:3000/news/123       http://localhost:3000/news/xxxxx

  @Get(':id')
  indexDynamic(@Param() param) {
    console.log(param);
    return '这是新闻页面-动态路由';
  }
}
