import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/currentUserDecorator';
import { CreateBlogDto } from 'src/dtos/create.blog.dto';
import { UpdateBlogDto } from 'src/dtos/update.blog.dto';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/gaurds/AuthGaurd';
import { BlogsService } from './blogs.service';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  create(@Body() body: CreateBlogDto, @CurrentUser() user: User) {
    return this.blogService.createBlog(body, user);
  }

  @Patch('/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() body: UpdateBlogDto,
    @CurrentUser() user: User,
  ) {
    return this.blogService.updateBlog(id, body, user);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @Delete('/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string, @CurrentUser() user: User) {
    return this.blogService.deleteBlog(id, user);
  }

  @ApiQuery({
    description: 'Enter the Keys to search',
    required: true,
    name: 'keys',
    type: [String],
  })
  @ApiQuery({
    required: false,
    name: 'limit',
    description: 'No. of records to fetch',
    type: Number,
    allowEmptyValue: true,
  })
  @ApiQuery({
    required: false,
    name: 'sorted_by',
    description: 'No. of records to fetch',
    enum: ['ASC', 'DESC'],
    allowEmptyValue: true,
  })
  @Get('/find-by-keys')
  findByKeys(
    @Query() query: { limit: number; sorted_by: string; keys: string[] },
  ) {
    const { limit, sorted_by, keys } = query;
    return this.blogService.findBlogByKeys(
      typeof keys === 'string' ? [keys] : keys,
      limit,
      sorted_by,
    );
  }

  @ApiQuery({
    required: false,
    name: 'limit',
    description: 'No. of records to fetch',
    type: Number,
    allowEmptyValue: true,
  })
  @ApiQuery({
    required: false,
    name: 'sorted_by',
    description: 'No. of records to fetch',
    enum: ['ASC', 'DESC'],
    allowEmptyValue: true,
  })
  @Get('/find-all')
  findAll(@Query() query: { limit: number; sorted_by: string }) {
    const { limit, sorted_by } = query;
    return this.blogService.findAllBlogs(limit, sorted_by);
  }

  

  @Get('/myblogs')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  findByEmail(@CurrentUser() user: User) {
    const resp=this.blogService.findBlogByEmail(user);
    // console.log(resp);
    return resp;
    
  }

  @Get('/:id')
  findByid(@Param('id') id: string) {
    return this.blogService.findBlogByid(id);
  }

  @Get('/category/:category')
  findByCategory(@Param('category') category: string) {
    return this.blogService.findBlogByCategory(category);
  }
}
