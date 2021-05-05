import { Module } from '@nestjs/common';
import { UsersModule } from './domain/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './domain/auth/auth.module';
import { UsersController } from './domain/users/users.controller';
import { HttpModule } from './domain/http/http.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'satoshi',
      password: '150386',
      database: 'gengar',
      entities: [__dirname + '/**/*{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [],
  exports: [],
})
export class AppModule {}