import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';

export const UseAdminGuard = () => {
  return UseGuards(AdminGuard);
};

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) {
      return false;
    }

    return request.currentUser.admin;
  }
}
