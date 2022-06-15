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

    @Column()
    description: string

    @Column('json')
    urls: string[]

    @Column('json')
    keys: string[]

    @ManyToOne(type=> User, user=>user.blogs, {cascade: true, eager: true})
    @JoinColumn()
    user: User


}