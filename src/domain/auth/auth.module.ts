import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { jwtKey } from './key';

@Module({
  providers: [UsersService, AuthService, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtKey.key,
      signOptions: { expiresIn: '8h' },
    }),
    UsersModule,
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
