import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactEntity } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    
    @InjectRepository(ContactEntity)
    private contactRepository : Repository<ContactEntity>
  ){}


  async create(createContactDto: CreateContactDto) {
    
    const Message = await this.contactRepository.create({       
      message: createContactDto.message});
      console.log(Message);
      return this.contactRepository.save(Message);
    }
}
