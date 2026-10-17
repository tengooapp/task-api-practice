import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class TaskActivity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  taskId!: number

  @Column()
  action!: string

  @CreateDateColumn()
  createdAt!: Date
}
