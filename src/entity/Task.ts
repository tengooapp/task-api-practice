import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { User } from './User'

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column({ type: 'varchar', nullable: true })
  description?: string

  @Column({ type: 'simple-enum', enum: TaskStatus, default: TaskStatus.TODO })
  status!: TaskStatus

  @Column({ type: 'simple-enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority!: TaskPriority

  @Column({ type: 'datetime', nullable: true })
  dueDate?: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assigneeId' })
  assignee!: User

  @Column()
  assigneeId!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @DeleteDateColumn()
  deletedAt?: Date
}
