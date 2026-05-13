import { Controller, Get, Response, Render } from '@nestjs/common';
import { NewsService } from 'src/news/news.service';

@Controller('article')
export class ArticleController {
  constructor(private newsService: NewsService) {} //实例化新闻服务
  // http://localhost:3000/article
  @Get()
  @Render('default/article')
  index(@Response() res) {
    res.cookie('username', 'zhangsan', {
      maxAge: 1000 * 15,
      httpOnly: true,
      signed:true
    });
    return {"username":"aaaaaaaaaaaa"};
    // res.send('我是一个文章页面');
    // console.log(this.newsService.findAll())
    // return  this.newsService.findAll();
    // return '我是一个文章页面';
  }

  @Get('add')
  addArticle() {
    return '增加新闻';
  }
}
