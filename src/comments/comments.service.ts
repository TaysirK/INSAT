import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,createQueryBuilder } from 'typeorm';
import {CommentEntity} from './entities/comment.entity'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>
  ) {}

  create(Comment: CreateCommentDto): Promise<CommentEntity> {
    return this.commentRepository.save(Comment);
  }

  findAll(): Promise<CommentEntity[]> {
    return this.commentRepository.find();
  }

  async findOne(id): Promise<CommentEntity> {
    const Entity = await this.commentRepository.findOne({where: {id}});
    if (! Entity) {
      throw new NotFoundException();
    }
    return Entity;
  }

  async update(id, Comment: CreateCommentDto) {
    const Entity = await this.commentRepository.preload({id,...Comment});
    if (! Entity) {
      throw new NotFoundException();
    }
    return this.commentRepository.save(Entity);
  }

  async remove(id) {
    return await this.commentRepository.softDelete(id);

  }
}
