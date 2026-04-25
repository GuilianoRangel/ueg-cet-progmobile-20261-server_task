import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tasks')
export class Task {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID único da tarefa' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Estudar NestJS', description: 'Título da tarefa' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Ler documentação oficial', description: 'Descrição detalhada', required: false })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: false, description: 'Status de conclusão' })
  @Column({ default: false })
  completed: boolean;

  @ApiProperty({ example: '2024-12-31T23:59:59Z', description: 'Data de vencimento' })
  @Column()
  due_date: Date;

  @ApiProperty({ example: 'João Silva', description: 'Responsável pela tarefa' })
  @Column()
  responsible: string;
}
