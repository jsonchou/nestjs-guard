import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { SIGN_USER_FLAG } from './common/constants/index'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置中间件
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser(SIGN_USER_FLAG));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
