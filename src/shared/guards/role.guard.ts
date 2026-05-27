import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequireRole } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get(RequireRole, context.getHandler());
    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRole: typeof requiredRole = request.user.role;

    if (userRole === 'admin') {
      return true;
    }

    if (userRole === 'manager' && requiredRole === 'employee') {
      return true;
    }

    return requiredRole === userRole;
  }
}