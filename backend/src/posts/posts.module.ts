import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma.service';
import { AccessTokenGuard } from './guards/access-token.guard';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, AccessTokenGuard],
})
export class PostsModule {}
