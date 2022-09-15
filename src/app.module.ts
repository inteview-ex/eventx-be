import { Module } from '@nestjs/common'
import { HealthModule } from './entities/base/health/health.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { validateMultiple } from './config/validate-multiple'
import { validateSystemConfig } from './config/env.validation'
import { validateDBConfig } from './config/db.validation'
import { RedisModule } from './common/redis/redis.module'
import { NomicsModule } from './common/nomics/nomics.module'
import { CryptoTickerModule } from './domain/crypto-ticker/crypto-ticker.module'
import { CryptoInfoModule } from './entities/crypto-info/crypto-info.module'
import { ScheduleModule } from '@nestjs/schedule'
import { CronTasksModule } from './domain/cron-tasks/cron-tasks.module'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
      load: [configuration],
      validate: validateMultiple([validateSystemConfig, validateDBConfig]),
    }),
    ScheduleModule.forRoot(),
    HealthModule,
    RedisModule,
    NomicsModule,
    CryptoInfoModule,
    CryptoTickerModule,
    CronTasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
