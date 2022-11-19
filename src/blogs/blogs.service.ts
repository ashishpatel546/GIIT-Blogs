import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { CreateBlogDto } from 'src/dtos/create.blog.dto';
import { Blog } from 'src/entities/blog.entity';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';
import { In, Repository, EntityManager } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
  ) { }

  async createBlog(blog: CreateBlogDto, user: User) {
    if (blog.keys) {
      blog.keys = blog.keys.split(',').map(s => s.trim()).join(',')
    }

    const newblog = this.blogRepo.create(blog);
    newblog.user = user;
    console.log(newblog);

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

  async findByLikes(){
    const blogs=await this.blogRepo.query('select * from blog where array_length("liked_by",1) is not null order by array_length("liked_by",1) desc limit 5')
    
    const result=blogs.map(async(blog)=>{
      const user= await this.userRepo.findOne({
        where:{
          id:blog.userId
        }
      })
      console.log(user);
      
      blog.user=user;
      console.log(blog.userId);
      
      return blog
    })
  
    return Promise.all(result)
  }
  findBlogByPage(page: number) {
    const limit_per_page = +process.env.LIMIT_PER_PAGE;
    const skip = (page - 1) * limit_per_page;
    return this.blogRepo.find({
      skip: skip,
      take: limit_per_page,
    });
  }

  async findBlogByKeys(
    keys: string[],
    limit: number = 10,
    sorted_by: string = 'ASC',
  ) {
    // return this.blogRepo.find({
    //   where: {
    //     keys: In ["new"],
    //   },
    //   take: limit,
    //   order: { created_on: sorted_by == 'ASC' ? 'ASC' : 'DESC' },
    // });

    //createQueryBuilder("user").where("user.id IN (:...ids)", { ids: [1, 2, 3, 4] })

    // return this.blogRepo.createQueryBuilder().select().where(":keys = ANY ( string_to_array(blog.keys, ','))", { keys: 'nest' })

    // console.log(keys);

    const blogs = keys.map(async (key) => {
      return await this.blogRepo.query(`select * from blog where '${key}'=any(string_to_array(keys,','))`)
    })

    
    let blogs2= (await Promise.all(blogs))[0]
    
    console.log(blogs2);
    
    const result=blogs2.map(async(blog)=>{
      const user= await this.userRepo.findOne({
        where:{
          id:blog.userId
        }
      })
      // console.log(user);
      
      blog.user=user;
      //console.log(blog.userId);
      
      return blog
    })
    //console.log((result));
    
    return await Promise.all(result) 

  }

  findBlogByEmail(user: User) {


    return this.blogRepo.find({
      relations: { user: true },
      where: {
        user: {

          email: user.email
        }
      }
    });
  }

  findBlogByCategory(category: string) {

    return this.blogRepo.find({
      relations: { user: true },
      where: {
        category: category
      }

    });
  }

 async likeBlog(id:string,user:User){

       //const blog=await this.findBlogByid(id);
       
       const response = await this.blogRepo.query(`update blog set liked_by=array_append(liked_by,'${user.id}') where id='${id}'`)
        return response;
  }

  async unlikeBlog(id:string,user:User){

    //const blog=await this.findBlogByid(id);
    
    const response = await this.blogRepo.query(`update blog set liked_by= array_remove(liked_by,'${user.id}') where id='${id}'`)
     return response;
}

findAllCategories()
{
   return this.categoryRepo.find()
}
}
