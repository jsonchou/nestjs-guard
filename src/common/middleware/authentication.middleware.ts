import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express'
import { USER_TOKEN_NAME } from '../constants/index'

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const user = req.signedCookies[USER_TOKEN_NAME]
    // 通过 cookie 中的 user，去查询 db,判断 user 的真实 roles  admin/owner/user
    if (user) {
      req['user'] = {
        roles: ['owner']//假设  admin/owner/user
      }
    }
    next();
  }
}
