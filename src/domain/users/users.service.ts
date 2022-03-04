import { Injectable } from '@nestjs/common';
import { Users } from '../../entities/Users';
import { CreateUserDTO } from './dto/create.users.dto';
import { UpdateUsersDTO } from './dto/update.users.dto';
import { makeSalt, encryptPassword } from '../../utils/cryptogram';
import { QueryDTO } from './dto/query.users.dto';
@Injectable()
export class UsersService {
  async retrieveUsersByConditions(query: QueryDTO) {
    const take = query.page_size || 10;
    const page = (query.page || 1) - 1;
    const name = query.name || '';
    const skip = page >= 0 ? page : 0;
    return null;
  }

  async retrieveUserByCondition(condition): Promise<Users> {
    return null;
  }

  async registerUser(createDTO: CreateUserDTO) {
    return null;
  }

  async updateUser(id: number, updateDto: UpdateUsersDTO) {
    return null;
  }

  async deleteUserById(id: any) {
    return null;
  }
}
