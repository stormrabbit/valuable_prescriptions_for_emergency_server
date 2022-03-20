import { Module } from '@nestjs/common';
import { UsersModule } from './domain/users/users.module';
import { AuthModule } from './domain/auth/auth.module';
import { UsersController } from './domain/users/users.controller';
import { HttpModule } from './domain/http/http.module';
import { FilesModule } from './domain/files/files.module';
import { PrescriptionsModule } from './domain/prescriptions/prescriptions.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    HttpModule,
    FilesModule,
    PrescriptionsModule,
    MongooseModule.forRoot(
      `mongodb://vpfe_admin:${process.env.PSWD}@${process.env.HOST}:${process.env.PORT}/vpfe_db`,
    ),
  ],
  controllers: [UsersController],
  providers: [],
  exports: [],
})
export class AppModule {}
