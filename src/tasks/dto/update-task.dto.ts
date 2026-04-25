import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Estudar NestJS Revisado', description: 'Título da tarefa', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Ler documentação oficial e praticar', description: 'Descrição detalhada', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2025-01-15T12:00:00Z', description: 'Data de vencimento', required: false })
  @IsDateString()
  @IsOptional()
  due_date?: string;

  @ApiProperty({ example: 'Maria Souza', description: 'Responsável pela tarefa', required: false })
  @IsString()
  @IsOptional()
  responsible?: string;
}
