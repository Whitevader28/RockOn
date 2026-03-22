import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
	@ApiProperty({
		description: 'Unique UUID-based name of the rock',
		example: 'f4f9bb8d-20d2-446a-950f-e6f0fc4a2367',
	})
	uniqueName: string;
}
