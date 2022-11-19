import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/entities/blog.entity';
import { User } from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CurrentUserMiddleware } from 'src/middlewares/current.user.middleware';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User,Category]), AuthModule, UserModule],
  providers: [BlogsService],
  controllers: [BlogsController]
})
export class BlogsModule {
  // configur(consumer:MiddlewareConsumer){
  //   consumer.apply(CurrentUserMiddleware).forRoutes('*')
  // }
}
