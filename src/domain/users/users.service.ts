import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/Users';
import { CreateUserDTO } from './dto/create.users.dto';
import { UpdateUsersDTO } from './dto/update.users.dto';
@Injectable()
export class UsersService {
  
  
 

    constructor(
        @InjectRepository(Users)
        private readonly userRepostory: Repository<Users>,
    ) { }

    async retrieveAllUser(): Promise<Users[]> {
        return await this.userRepostory.find()
    }

    async retrieveUserById(id: number): Promise<Users> {
        return await this.userRepostory.findOne({
            where: {
                id
            }
        })
    }

    async createUser(createDTO: CreateUserDTO) {
        const users = this.userRepostory.create(createDTO);
        return this.userRepostory.save(users)
    }

    async updateUser(id: number, updateDto: UpdateUsersDTO) {
        try {
            const {
                affected
            } = await this.userRepostory.update(id, updateDto);
            return  {message: affected === 1 ? '修改成功': '未修改成功'}
        } catch (error) {
            return {errorMsg: `${error}`}
        }

    }

    async deleteUserById(id: any) {
        try {
            const {
                affected
            } = await this.userRepostory.update(id, {status: 1});
            return  {message: affected === 1 ? '删除成功': '未删除成功'}
        } catch (error) {
            return {errorMsg: `${error}`}
        }
    }
}