import {
  Body,
  Controller,
  Delete,
  Get,
  HttpService,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';
import { AuthService } from '../auth/auth.service';
import { CreateUserDTO } from './dto/create.users.dto';
import { QueryDTO } from './dto/query.users.dto';
import { UpdateUsersDTO } from './dto/update.users.dto';
import { UsersService } from './users.service';

@ApiTags('用户')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private httpService: HttpService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get('info/list')
  async retrieveUsersByConditions(@Query() query: QueryDTO) {
    return this.usersService.retrieveUsersByConditions(query);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('info/:id')
  async retrieveUserById(@Param('id') id: number): Promise<Users> {
    return this.usersService.retrieveUserByCondition({ id });
  }

  @Post('register')
  async registerUser(@Body() createDTO: CreateUserDTO) {
    console.log(createDTO);
    return this.usersService.registerUser(createDTO);
  }

  @Post('login')
  async loginUser(@Body() loginDTO: CreateUserDTO) {
    const user = await this.authService.verifyUser(loginDTO);
    return user
      ? this.authService.createUserToken(user)
      : {
          errorMsg: '用户名或密码错误',
        };
  }

  // @UseGuards(AuthGuard('jwt'))
  @Patch('info/:id')
  async updateUserById(@Param('id') id, @Body() updateDto: UpdateUsersDTO) {
    return this.usersService.updateUser(id, updateDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete('info/:id')
  async deleteUserById(@Param('id') id) {
    return this.usersService.deleteUserById(id);
  }
}
