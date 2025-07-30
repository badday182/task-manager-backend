import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CreateTaskDto } from 'src/dto/create-task.dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.taskRepository.find({
      skip: offset,
      take: limit,
    });
  }
  async findOne(id: string) {
    // const coffee = await this.coffeeRepository.findOne(id);
    const task = await this.taskRepository.findOne({
      where: { id: +id },
    });
    if (!task) {
      throw new NotFoundException(`Task id ${id} not found`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.preload({
      id: +id,
      ...updateTaskDto,
    });
    if (!task) {
      throw new NotFoundException(`Task id ${id} not found`);
    }
    return this.taskRepository.save(task);
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    return this.taskRepository.remove(task);
  }
}
