import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { DataInterceptor } from './interceptor/data.interceptor';
import { AllExceptionFilter } from './filter/all-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true }));
  app.use(logger); // 引入日志中间件
  app.useGlobalInterceptors(new TransformInterceptor()); // 日志记录
  app.useGlobalInterceptors(new DataInterceptor()); // 返回值规范化
  app.useGlobalFilters(new AllExceptionFilter()); // 引入异常过滤器
  app.enableCors(); // 允许跨域
  const options = new DocumentBuilder()
    .setTitle('Gengar')
    .setDescription('Nestjs 开发基础代码')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(8902);
}
bootstrap();
