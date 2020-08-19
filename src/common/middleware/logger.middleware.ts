import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express'
import { USER_TOKEN_NAME } from '../constants/index'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(`Catch request...`);
    next();
  }
}
