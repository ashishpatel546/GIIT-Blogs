import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from 'src/dtos/create.blog.dto';
import { Blog } from 'src/entities/blog.entity';
import { User } from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createBlog(blog: CreateBlogDto, user: User) {
    const newblog = await this.blogRepo.create(blog);
    newblog.user = user;
    return this.blogRepo.save(newblog);
  }

  async updateBlog(id: string, blog: Partial<Blog>, user: User) {
    const blogToUpdate = await this.blogRepo.findOne({ where: { id: id } });
    if (!blogToUpdate) throw new NotFoundException('Blog not found');
    if (!(blogToUpdate.user.id === user.id))
      throw new BadRequestException(
        'You are not allowed to update/delete the blog',
      );
    Object.assign(blogToUpdate, blog);
    return this.blogRepo.save(blogToUpdate);
  }

  async deleteBlog(id: string, user: User) {
    const blogToDelete = await this.blogRepo.findOne({
      where: { id: id },
      relations: { user: true },
    });
    if (!blogToDelete) throw new NotFoundException('Blog not found');
    if (!(blogToDelete.user.id === user.id))
      throw new BadRequestException(
        'You are not allowed to update/delete the blog',
      );
    return await this.blogRepo.delete({ id: id });
    // return this.blogRepo.remove(blogToDelete)
  }

  async findBlogByid(id: string) {
    const blog = await this.blogRepo.findOne({
      where: { id: id },
    });
    return blog;
  }

  findAllBlogs(limit: number = 10, sorted_by: string = 'ASC') {
    return this.blogRepo.find({
      relations: { user: true },
      take: limit,
      order: { created_on: sorted_by == 'ASC' ? 'ASC' : 'DESC' },
    });
  }

  findBlogByPage(page: number) {
    const limit_per_page = +process.env.LIMIT_PER_PAGE;
    const skip = (page - 1) * limit_per_page;
    return this.blogRepo.find({
      skip: skip,
      take: limit_per_page,
    });
  }

  findBlogByKeys(
    keys: string[],
    limit: number = 10,
    sorted_by: string = 'ASC',
  ) {
    return this.blogRepo.find({
      where: {
        keys: In [keys.join(',')],
      },
      take: limit,
      order: { created_on: sorted_by == 'ASC' ? 'ASC' : 'DESC' },
    });
  }
}
