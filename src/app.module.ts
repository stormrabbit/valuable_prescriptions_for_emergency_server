import { Module } from '@nestjs/common';
import { UsersModule } from './domain/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
})
export class AppModule {}