import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // 当前接口API，需要的特定角色，才能访问
    const canAccessRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!canAccessRoles) {
      // 没有 roles，表示不需要 roles 标记
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userRoles: Array<string> = user?.roles

    if (userRoles) {
      // userRoles 与 canAccessRoles 是否存在交集
      return userRoles.some(item => canAccessRoles.includes(item))
    }
    return false
  }
}
