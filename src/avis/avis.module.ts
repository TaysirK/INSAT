import { Module } from '@nestjs/common';
import { AvisService } from './avis.service';
import { AvisController } from './avis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AvisEntity} from './entities/avi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AvisEntity])],
  controllers: [AvisController],
  providers: [AvisService]
})
export class AvisModule {}
