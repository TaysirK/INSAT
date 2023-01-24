import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAffichageDto } from './dto/create-affichage.dto';
import { UpdateAffichageDto } from './dto/update-affichage.dto';
import { AffichageEntity } from './entities/affichage.entity';

@Injectable()
export class AffichagesService {
  constructor(
    @InjectRepository(AffichageEntity)
    private affichageRepository: Repository<AffichageEntity>
  ){

  }
  async findaffichage(filiere:string,niveau:number){
    const affichages= await this.affichageRepository.createQueryBuilder("affichage")
    .where("affichage.filiere= :filiere", {filiere})
    .andWhere("affichage.niveau= :niveau",{niveau})
    .getMany();
    return affichages;
  }


  
}
