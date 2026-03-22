import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { AccessTokenGuard } from '../posts/guards/access-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a rock with its UUID unique name' })
  authenticate(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.authenticate(createAuthDto);
  }

  @Post('register-rock')
  @ApiOperation({ summary: 'Create a rock with random pedigree, vibe and traits' })
  registerRock() {
    return this.authService.registerRock();
  }

  @Post('validate-token')
  @ApiOperation({ summary: 'Validate that a token is the latest one for this rock' })
  validateToken(@Body() validateTokenDto: ValidateTokenDto) {
    return this.authService.validateToken(validateTokenDto);
  }

  @Get('profile/:rockId')
  @ApiOperation({ summary: 'Get profile information for a rock by id' })
  getRockProfile(@Param('rockId') rockId: string) {
    return this.authService.getRockProfile(rockId);
  }

  @Post('profile-picture')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ApiOperation({
    summary:
      'Upload profile picture for authenticated rock (compressed before Cloudinary upload)',
  })
  uploadProfilePicture(@Req() req: any, @UploadedFile() file: any) {
    return this.authService.uploadProfilePicture(req.rock.id, file);
  }

  @Get()
  @ApiOperation({ summary: 'Simple profile check endpoint' })
  profile() {
    return this.authService.profileInfo();
  }
}
