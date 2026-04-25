import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Estudar NestJS', description: 'Título da tarefa' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Ler documentação oficial', description: 'Descrição detalhada', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2024-12-31T23:59:59Z', description: 'Data de vencimento' })
  @IsDateString()
  @IsNotEmpty()
  due_date: string;

  @ApiProperty({ example: 'João Silva', description: 'Responsável pela tarefa' })
  @IsString()
  @IsNotEmpty()
  responsible: string;
}
