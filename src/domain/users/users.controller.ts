import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { CreateUserDTO } from './dto/create.users.dto';
import { UpdateUsersDTO } from './dto/update.users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){}

    @Get('list')
    async retrieveAllUsers(): Promise<Users[]> {
        return this.usersService.retrieveAllUser();
    }

    @Get(':id')
    async retrieveUserById(@Param('id') id:number): Promise<Users> {
        return this.usersService.retrieveUserById(id);
    }

    @Post()
    async createUser(@Body() createDTO:CreateUserDTO) {
        return this.usersService.createUser(createDTO);
    }

    @Patch(':id')
    async updateUserById(@Param('id') id,@Body() updateDto:UpdateUsersDTO ){
        return this.usersService.updateUser(id, updateDto);
    }
}
