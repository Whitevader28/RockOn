import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { AccessTokenGuard } from '../posts/guards/access-token.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AccessTokenGuard],
})
export class AuthModule {}
