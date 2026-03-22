import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';

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

  @Get()
  @ApiOperation({ summary: 'Simple profile check endpoint' })
  profile() {
    return this.authService.profileInfo();
  }
}
