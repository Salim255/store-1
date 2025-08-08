import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
//import { JwtTokenService } from './jws-token-service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

export type JwtTokenPayload = {
  id: string;
  exp: number;
  iat: number;
};

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }

    try {
      const decoded: JwtTokenPayload = await this.jwtService.verifyAsync(token);
      // Set decode as user in request
      request.user = { id: decoded.id };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
