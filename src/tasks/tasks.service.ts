import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      completed: false,
    });
    return await this.taskRepository.save(task);
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const [items, total] = await this.taskRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { due_date: 'ASC' },
    });

    return {
      items,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  async findPending(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const [items, total] = await this.taskRepository.findAndCount({
      where: { completed: false },
      skip: (page - 1) * limit,
      take: limit,
      order: { due_date: 'ASC' },
    });

    return {
      items,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return task;
  }

  async updateDetails(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  async changeStatus(id: string, isCompleted: boolean): Promise<Task> {
    const task = await this.findOne(id);
    task.completed = isCompleted;
    return await this.taskRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}
