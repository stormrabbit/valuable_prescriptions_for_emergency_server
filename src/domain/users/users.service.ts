import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Users } from '../../entities/Users';
import { CreateUserDTO } from './dto/create.users.dto';
import { UpdateUsersDTO } from './dto/update.users.dto';
import { makeSalt, encryptPassword} from '../../utils/cryptogram';
import { QueryDTO } from './dto/query.users.dto';
@Injectable()
export class UsersService {
  
  
 

    constructor(
        @InjectRepository(Users)
        private readonly userRepostory: Repository<Users>,
    ) { }

    async retrieveUsersByConditions(query: QueryDTO) {
        const take = query.page_size || 10;
        const page = (query.page || 1) - 1;
        const name = query.name || '';
        const skip = page >=0 ? page: 0;
        const [result, total] = await this.userRepostory.findAndCount({
          where: {
            status: 0,
            name: Like('%' + name + '%') 
          },
          order: {
            id: 'ASC'
          },
          take,
          skip: skip * take,
        })
        const totalPage = Math.ceil(total/take);
        return {
          list: (page > (totalPage -1) )? []: result,
          'total_page':totalPage,
          page: (page+1),
          'page_size': take
        }
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