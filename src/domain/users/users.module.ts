import { Module } from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
