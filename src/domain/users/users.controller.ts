import { Body, Controller, Delete, Get, HttpService, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';
import { AuthService } from '../auth/auth.service';
import { CreateUserDTO } from './dto/create.users.dto';
import { UpdateUsersDTO } from './dto/update.users.dto';
import { UsersService } from './users.service';

@ApiTags('用户')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private httpService: HttpService
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Get('list')
    async retrieveAllUsers(): Promise<Users[]> {
        return this.usersService.retrieveAllUser();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async retrieveUserById(@Param('id') id:number): Promise<Users> {
        return this.usersService.retrieveUserByCondition({id});
    }

    @Post('register')
    async registerUser(@Body() createDTO:CreateUserDTO) {
        return this.usersService.registerUser(createDTO);
    }

    @Post('login')
    async loginUser(@Body() loginDTO:CreateUserDTO) {
        const user = await this.authService.verifyUser(loginDTO);
        return user? this.authService.createUserToken(user) : {
            errorMsg:'用户名或密码错误'
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async updateUserById(@Param('id') id,@Body() updateDto:UpdateUsersDTO ){
        return this.usersService.updateUser(id, updateDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteUserById(@Param('id') id) {
        return this.usersService.deleteUserById(id)
    }
}
