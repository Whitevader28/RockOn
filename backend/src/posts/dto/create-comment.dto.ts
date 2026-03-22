import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Text content of the comment',
    example: 'That is one legendary rock vibe.',
  })
  content: string;
}
