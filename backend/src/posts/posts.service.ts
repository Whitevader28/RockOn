import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(rockId: string, createPostDto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        content: createPostDto.content,
        imgUrl: createPostDto.imgUrl,
        rockId,
      },
      include: {
        rock: {
          select: {
            id: true,
            uniqueName: true,
            name: true,
          },
        },
      },
    });

    return {
      message: 'Post created successfully',
      post,
    };
  }

  async listPosts() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        rock: {
          select: {
            id: true,
            uniqueName: true,
            name: true,
          },
        },
        comments: {
          orderBy: { createdAt: 'asc' },
          include: {
            commenter: {
              select: {
                id: true,
                uniqueName: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async createComment(rockId: string, postId: string, createCommentDto: CreateCommentDto) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = await this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        commenterId: rockId,
        postId,
      },
      include: {
        commenter: {
          select: {
            id: true,
            uniqueName: true,
            name: true,
          },
        },
      },
    });

    return {
      message: 'Comment created successfully',
      comment,
    };
  }
}
