import { type } from "os";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Blog{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    created_on: Date

    @UpdateDateColumn()
    last_updated_on: Date

    @Column()
    title: string

    @Column("text")
    description: string

    @Column()
    category: string

    @Column()
    urls: string

    @Column()
    keys: string

    @ManyToOne(type=> User, user=>user.blogs, {cascade: true, eager: true})
    @JoinColumn()
    user: User


    @Column({nullable:true,array:true})
    liked_by: string
}