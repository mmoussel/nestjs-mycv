import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';

export const UseAuthGuard = () => {
  return UseGuards(AuthGuard);
};

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
