import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { OptionalFirebaseAuthGuard } from '../auth/optional-firebase-auth.guard';
import { RequestWithUser } from '../auth/types';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Like } from './entities/like.entity';
import { LikeTarget } from './entities/like.entity';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiOperation({ summary: 'Agregar o actualizar un like/dislike' })
  @ApiCreatedResponse({
    description: 'Like o dislike agregado/actualizado correctamente.',
    type: Like,
  })
  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  async createOrUpdate(
    @Request() req: RequestWithUser,
    @Body() createLikeDto: CreateLikeDto,
  ): Promise<Like | null> {
    return this.likeService.createOrUpdate(createLikeDto, req.user);
  }

  @ApiOperation({ summary: 'Eliminar un like/dislike' })
  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.likeService.remove(+id);
  }

  @ApiOperation({ summary: 'Listar todos los likes de una publicación o nota' })
  @ApiOkResponse({
    description: 'Lista de likes',
    type: [Like],
  })
  @Get(':targetType/:targetId')
  @UseGuards(OptionalFirebaseAuthGuard)
  findLikesByTarget(
    @Param('targetType') targetType: LikeTarget,
    @Param('targetId') targetId: string,
    @Request() req: RequestWithUser,
  ): Promise<Like[]> {
    return this.likeService.findLikesByTarget(targetType, +targetId);
  }

  @ApiOperation({
    summary: 'Contar los likes y dislikes de una publicación o nota',
  })
  @ApiOkResponse({
    description: 'Conteo de likes y dislikes',
    schema: {
      type: 'object',
      properties: {
        likes: { type: 'number' },
        dislikes: { type: 'number' },
      },
    },
  })
  @Get(':targetType/:targetId/count')
  @UseGuards(OptionalFirebaseAuthGuard)
  countLikesAndDislikes(
    @Param('targetType') targetType: LikeTarget,
    @Param('targetId') targetId: string,
  ): Promise<{ likes: number; dislikes: number }> {
    return this.likeService.countLikesAndDislikes(targetType, +targetId);
  }

  @ApiOperation({
    summary: 'Verificar si un usuario ya dio like o dislike a un contenido',
  })
  @ApiOkResponse({
    description: 'Like encontrado o no',
    type: Like,
  })
  @Get(':targetType/:targetId/user-like')
  @UseGuards(OptionalFirebaseAuthGuard)
  findUserLike(
    @Param('targetType') targetType: LikeTarget,
    @Param('targetId') targetId: string,
    @Request() req: RequestWithUser,
  ): Promise<Like | null> {
    return this.likeService.findUserLike(targetType, +targetId, req.user);
  }
}
