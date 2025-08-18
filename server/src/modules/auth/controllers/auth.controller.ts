import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from '../auth-jwt.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: string };
}

@ApiCookieAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @UseGuards(AuthJwtGuard)
  @Get('status')
  getAuthStatus(@Req() req: AuthenticatedRequest) {
    return {
      status: 'Success',
      data: {
        authenticated: true,
        id: req.user.id,
      },
    };
  }
}
