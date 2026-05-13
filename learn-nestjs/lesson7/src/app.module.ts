import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsController } from './news/news.controller';
import { ArticleController } from './article/article.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { NewsService } from './news/news.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    NewsController,
    ArticleController,
    UserController,
  ],
  providers: [AppService, UserService, NewsService],
})
export class AppModule {}
