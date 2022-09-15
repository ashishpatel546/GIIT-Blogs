import {Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

export interface UserData{
    email: string,
    name: string,
    password: string
    mobile: string
}

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private repo: Repository<User>
    ){}

    find(limit?: number){
        return this.repo.find({take: limit })
    }

    async findByEmail(email:string){ 
             
             
        return await this.repo.findOne({where: {email: email}})
    }

    async create(userData: UserData){
        const user = this.repo.create(userData)
        const savedUser = await this.repo.save(user)
        const {password, ...otherInfo} = savedUser
        return otherInfo
    }

    async updateById(id:string, userData: Partial<UserData>, loggedInUser: User){
        const user = await this.repo.findOne({where: {id:id}})
        if(!user) throw new NotFoundException('User not found')
        if(!(user.id === loggedInUser.id)) throw new UnauthorizedException('You can update only your own account')
        Object.assign(user, userData)
        return this.repo.save(user)
    }

    async updateByEmail(email:string, userData: Partial<UserData>, loggedInUser: User){
        const user = await this.findByEmail(email)
        if(!user) throw new NotFoundException('User not found')
        if(!(user.id === loggedInUser.id)) throw new UnauthorizedException('You can update only your own account')
        Object.assign(user, userData)
        return this.repo.save(user)
    }
    async deleteById(id:string, loggedInUser: User){
        const user = await this.repo.findOne({where: {id:id}})
        if(!user) throw new NotFoundException('User not found')
        if(!(user.id === loggedInUser.id)) throw new UnauthorizedException('You can delete only your own account')
        return this.repo.delete({id:id})
    }

    async deleteByEmail(email:string, loggedInUser: User){
        const user = await this.findByEmail(email)
        if(!user) throw new NotFoundException('User not found')
        if(!(user.id === loggedInUser.id)) throw new UnauthorizedException('You can delete only your own account')
        return this.repo.delete({email:email})
    }

    async currentUser(user:User)
    {
        console.log(user);
        
        return await this.repo.findOne({where: {email: user.email}})
    }

}
