import { Injectable } from '@nestjs/common';
import { CreateAviDto } from './dto/create-avi.dto';
import { Repository,createQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {AvisEntity} from './entities/avi.entity'
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class AvisService {
  constructor(
    @InjectRepository(AvisEntity)
    private avisRepository: Repository<AvisEntity>
  ) {}


    create(AvisDto:CreateAviDto): Promise<AvisEntity> {
      return this.avisRepository.save(AvisDto);
    }

    findAll(): Promise<AvisEntity[]> {
      return this.avisRepository.find();
    }
    async findOne(id): Promise<AvisEntity> {
      const Entity = await this.avisRepository.findOne({where: {id}});
      if (! Entity) {
        throw new NotFoundException();
      }
      return Entity;
    }

    async update(id, AvisDto:CreateAviDto) {
      const Entity = await this.avisRepository.preload({id,...AvisDto});
      if (! Entity) {
        throw new NotFoundException();
      }
      return this.avisRepository.save(Entity);
    }

    async remove(id) {
      return await this.avisRepository.softDelete(id);
    
    }
    async findWithComments(id: string): Promise<AvisEntity> {
      return this.avisRepository
        .createQueryBuilder('avis')
        .leftJoinAndSelect('avis.comments', 'comments')
        .where('avis.id = :id', { id })
        .getOne();
    }

}
