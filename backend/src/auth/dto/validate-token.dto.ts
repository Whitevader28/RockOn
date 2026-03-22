import { ApiProperty } from '@nestjs/swagger';

export class ValidateTokenDto {
  @ApiProperty({
    description: 'Unique UUID-based name of the rock',
    example: 'f4f9bb8d-20d2-446a-950f-e6f0fc4a2367',
  })
  uniqueName: string;

  @ApiProperty({
    description: 'Latest access token returned by login',
    example: '7a9ee6ba-17c7-4b67-9253-a7fe20c3aa9f',
  })
  accessToken: string;
}
