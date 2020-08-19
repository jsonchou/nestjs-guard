import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { CatsController } from './cats/cats.controller';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthenticationMiddleware } from './common/middleware/authentication.middleware';

import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CatsModule, CoreModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, AuthenticationMiddleware)
      .forRoutes(CatsController);
  }
}