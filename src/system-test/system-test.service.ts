import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common'
import { Connection, getConnectionManager } from 'typeorm'

@Injectable()
export class SystemTestService implements OnModuleInit {
  constructor() {}
  private connection: Connection
  onModuleInit() {
    const connectionManager = getConnectionManager()
    if (connectionManager.connections.length <= 0) {
      throw new InternalServerErrorException('No DB connection')
    }
    this.connection = connectionManager.connections[0]
  }

  public async cleanDatabase(): Promise<void> {
    try {
      const entities = this.connection.entityMetadatas
      for (const entity of entities) {
        const repository = this.connection.getRepository(entity.name) // Get repository
        const count = await repository.count()
        if (count > 0) {
          await repository.clear() // Clear each entity table's content
        }
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test database: ${error}`)
    }
  }

  public async checkIsDatabaseClean(): Promise<boolean> {
    try {
      const entities = this.connection.entityMetadatas

      for (const entity of entities) {
        const repository = this.connection.getRepository(entity.name) // Get repository
        const [_, count] = await repository.findAndCount() // Clear each entity table's content
        if (count > 0) {
          throw new Error(
            `Database Entities ${entity.name} is not empty. Count ${count}`
          )
        }
      }
      // console.log('[CHECK DATABASE CLEAN]: Clean')
      return true
    } catch (error) {
      throw new Error(`ERROR: Cleaning test database: ${error}`)
    }
  }

  // async initTestData() {}
}
