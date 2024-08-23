import { IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LikeTarget } from '../entities/like.entity';

export class CreateLikeDto {
  @IsBoolean()
  @ApiProperty({ description: 'true para like, false para dislike' })
  isLike: boolean;

  @IsEnum(LikeTarget)
  @ApiProperty({
    description: 'Tipo de contenido (note o library)',
    enum: LikeTarget,
  })
  targetType: LikeTarget;

  @IsNumber()
  @ApiProperty({
    description: 'ID del contenido al que se le dio el like o dislike',
    example: 1,
  })
  targetId: number;
}
