import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/cryptogram';
import { CreateUserDTO } from '../users/dto/create.users.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, 
        private readonly jwtService: JwtService) { }

    async verifyUser(dto:CreateUserDTO): Promise<any> {
        const user = await this.usersService.retrieveUserByCondition({ name: dto.name });
        if (user) {
            const hashedPassword = user.password;
            const salt = user.salt;
            const hashPassword = encryptPassword(dto.password, salt);
            return (hashedPassword === hashPassword) ? user: null;
        }
        return null;
    }

    async createUserToken(user: any) {
        const payload = { username: user.name, sub: user.id};
        try {
            const token = this.jwtService.sign(payload);
            return {
                token
            };
        } catch (error) {
            return {
                errorMsg: error
            };
        }
    }
}
