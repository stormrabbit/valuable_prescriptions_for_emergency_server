import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/Users';
import { CreateUserDTO } from './dto/create.users.dto';
import { UpdateUsersDTO } from './dto/update.users.dto';
import { makeSalt, encryptPassword} from '../../utils/cryptogram';
@Injectable()
export class UsersService {
  
  
 

    constructor(
        @InjectRepository(Users)
        private readonly userRepostory: Repository<Users>,
    ) { }

    async retrieveAllUser(): Promise<Users[]> {
        return await this.userRepostory.find()
    }

    async retrieveUserByCondition(condition): Promise<Users> {
        return await this.userRepostory.findOne({
            where: condition
        })
    }


    async registerUser(createDTO: CreateUserDTO) {
        const existUser =await this.userRepostory.findOne({
            where: {
                name: createDTO.name
            }
        })
        if(existUser) {
            return {errorMsg: '用户已存在'};
        }
        const users = this.userRepostory.create(createDTO);
        const salt = makeSalt();
        const codedPassword = encryptPassword(users.password, salt);
        users.salt = salt;
        users.password = codedPassword;
        return await this.userRepostory.save(users)
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