import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Category{
     
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name:string

}