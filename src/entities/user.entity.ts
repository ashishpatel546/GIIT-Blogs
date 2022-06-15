import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Blog } from "./blog.entity";

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    created_on: Date

    @UpdateDateColumn()
    last_updated_on: Date

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    mobile: string

    @Column()
    password: string

    @Column({default: 'India'})
    country: string

    @OneToMany(type => Blog, (blog)=> blog.user)
    blogs: Blog[]
}