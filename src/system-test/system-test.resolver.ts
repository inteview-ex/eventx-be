import { UseGuards } from '@nestjs/common'
import { Mutation, Query, Resolver } from '@nestjs/graphql'
import { DevEnvOnlyGuard } from 'src/utils/devEnvOnlyGuard/dev.guard'
import { SystemTestService } from './system-test.service'

@UseGuards(DevEnvOnlyGuard)
@Resolver()
export class SystemTestResolver {
  constructor(private readonly systemTestService: SystemTestService) {}

  @Mutation((returns) => Boolean)
  async cleanDatabase(): Promise<any> {
    await this.systemTestService.cleanDatabase()
    return true
  }

  @Query((returns) => Boolean)
  async checkIsDatabaseClean(): Promise<boolean> {
    return await this.systemTestService.checkIsDatabaseClean()
  }
}
