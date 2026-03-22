import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AccessTokenGuard } from './guards/access-token.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a post for the authenticated rock token' })
  createPost(@Req() req: any, @Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(req.rock.id, createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all posts with comments' })
  listPosts() {
    return this.postsService.listPosts();
  }

  @Post(':postId/comments')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a comment on a post using the authenticated rock token' })
  createComment(
    @Req() req: any,
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.postsService.createComment(req.rock.id, postId, createCommentDto);
  }
}
