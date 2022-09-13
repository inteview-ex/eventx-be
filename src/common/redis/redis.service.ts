import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient } from 'redis'
import { RedisConf } from 'src/config/configuration'

@Injectable()
export class RedisService
  implements OnApplicationShutdown, OnModuleInit
{
  constructor(private readonly configService: ConfigService) {}
  private readonly redisConfig =
    this.configService.get<RedisConf>('redis')
  private readonly redisClient = createClient({ url: this.redisConfig.url })
  private readonly logger = new Logger(RedisService.name)

  async onModuleInit() {
    // Init connection to Redis
    this.logger.log(
      `Connecting Socket emitter to redis --> ${this.redisConfig.url}`
    )
    await this.redisClient.connect()
    this.logger.log(`Connect Redis successfully`)
  }

  async onApplicationShutdown() {
    await this.redisClient.disconnect()
  }

  async getRedisClient() {
    return this.redisClient
  }
}
