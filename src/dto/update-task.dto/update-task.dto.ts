// export class UpdateCoffeeDto {
//   readonly name?: string;
//   readonly brand?: string;
//   readonly flavors?: string[];

import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from '../create-task.dto/create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
