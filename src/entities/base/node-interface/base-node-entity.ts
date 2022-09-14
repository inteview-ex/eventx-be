import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'

@Entity()
export class BaseNodeEntity {
  @CreateDateColumn()
  createAt?: Date

  @UpdateDateColumn()
  updateAt?: Date
}
