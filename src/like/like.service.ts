import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like, LikeTarget } from './entities/like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  async createOrUpdate(
    createLikeDto: CreateLikeDto,
    user: User,
  ): Promise<Like | null> {
    const existingLike = await this.likeRepository.findOne({
      where: {
        user,
        targetType: createLikeDto.targetType,
        targetId: createLikeDto.targetId,
      },
    });

    if (existingLike) {
      if (existingLike.isLike === createLikeDto.isLike) {
        await this.likeRepository.remove(existingLike);
        return null;
      } else {
        existingLike.isLike = createLikeDto.isLike;
        return this.likeRepository.save(existingLike);
      }
    }

    const newLike = new Like();
    newLike.user = user;
    newLike.targetType = createLikeDto.targetType;
    newLike.targetId = createLikeDto.targetId;
    newLike.isLike = createLikeDto.isLike;

    return this.likeRepository.save(newLike);
  }

  async remove(likeId: number): Promise<void> {
    await this.likeRepository.delete(likeId);
  }

  async countLikesAndDislikes(
    targetType: LikeTarget,
    targetId: number,
  ): Promise<{ likes: number; dislikes: number }> {
    const likes = await this.likeRepository.count({
      where: { targetType, targetId, isLike: true },
    });

    const dislikes = await this.likeRepository.count({
      where: { targetType, targetId, isLike: false },
    });

    return { likes, dislikes };
  }

  async findLikesByTarget(
    targetType: LikeTarget,
    targetId: number,
  ): Promise<Like[]> {
    return this.likeRepository.find({
      where: { targetType, targetId },
    });
  }

  async findUserLike(
    targetType: LikeTarget,
    targetId: number,
    user: User,
  ): Promise<Like | null> {
    return this.likeRepository.findOne({
      where: {
        targetType,
        targetId,
        user,
      },
    });
  }
}
