import { PartialType } from '@nestjs/mapped-types';
import { CreateSuperUserDto } from './create-super-user.dto';

export class UpdateSuperUserDto extends PartialType(CreateSuperUserDto) {}
