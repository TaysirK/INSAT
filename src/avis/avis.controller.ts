import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvisService } from './avis.service';
import { CreateAviDto } from './dto/create-avi.dto';

@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) {}

  @Post()
  create(@Body() avis: CreateAviDto) {
    return this.avisService.create(avis);
  }

  @Get()
  findAll() {
    return this.avisService.findAll();
  }
  @Get('/withComment/:id')
  findOneWithComments() {
    return this.avisService.findWithComments(':id');
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avisService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() avis: CreateAviDto) {
    return this.avisService.update(id, avis);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avisService.remove(id);
  }

}
