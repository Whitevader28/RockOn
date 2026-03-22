import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const accessToken = authHeader.slice('Bearer '.length).trim();

    if (!accessToken) {
      throw new UnauthorizedException('Access token is required');
    }

    const rock = await this.prisma.rock.findUnique({
      where: { accessToken },
      select: {
        id: true,
        uniqueName: true,
        name: true,
        isRegistered: true,
      },
    });

    if (!rock || !rock.isRegistered) {
      throw new UnauthorizedException(
        'Token expired or invalid. Re-enter UUID to login again.',
      );
    }

    request.rock = rock;
    return true;
  }
}
