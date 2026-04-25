import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso', type: Task })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Lista tarefas pendentes com paginação' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas pendentes' })
  findPending(@Query() pagination: PaginationDto) {
    return this.tasksService.findPending(pagination);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as tarefas com paginação' })
  @ApiResponse({ status: 200, description: 'Lista de todas as tarefas' })
  findAll(@Query() pagination: PaginationDto) {
    return this.tasksService.findAll(pagination);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edita detalhes de uma tarefa (apenas título, descrição, responsável e vencimento)' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso', type: Task })
  @ApiParam({ name: 'id', description: 'ID da tarefa (UUID)' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateDetails(id, updateTaskDto);
  }

  @Patch(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Marca uma tarefa como concluída' })
  @ApiResponse({ status: 200, description: 'Tarefa concluída com sucesso', type: Task })
  complete(@Param('id') id: string) {
    return this.tasksService.changeStatus(id, true);
  }

  @Patch(':id/pending')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retorna uma tarefa para o status pendente' })
  @ApiResponse({ status: 200, description: 'Tarefa alterada para pendente com sucesso', type: Task })
  revertToPending(@Param('id') id: string) {
    return this.tasksService.changeStatus(id, false);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Exclui uma tarefa' })
  @ApiResponse({ status: 204, description: 'Tarefa excluída com sucesso' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
