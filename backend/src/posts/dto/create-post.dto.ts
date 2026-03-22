import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Text content of the post',
    example: 'Just got polished and feeling shiny today.',
  })
  content: string;

  @ApiProperty({
    description: 'Optional image URL for the post',
    required: false,
    example: 'https://example.com/rock-selfie.png',
  })
  imgUrl?: string;
}
