import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmMongoDBConfig } from './config/typeorm.config'
import { join } from 'path'
import { HealthModule } from './entities/base/health/health.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { validateMultiple } from './config/validate-multiple'
import { validateSystemConfig } from './config/env.validation'
import { validateDBConfig } from './config/db.validation'
import { SystemTestModule } from './system-test/system-test.module'
import { ApolloDriver } from '@nestjs/apollo'
import { RedisModule } from './common/redis/redis.module'
import { NomicsModule } from './common/nomics/nomics.module'
import { CryptoTickerModule } from './domain/crypto-ticker/crypto-ticker.module'
import { CryptoInfoModule } from './entities/crypto-info/crypto-info.module'
import { ScheduleModule } from '@nestjs/schedule'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
      load: [configuration],
      validate: validateMultiple([validateSystemConfig, validateDBConfig]),
    }),
    TypeOrmModule.forRoot({
      ...typeOrmMongoDBConfig,
      keepConnectionAlive: true,
      // logging:true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: false,
      introspection: true, //allow schama get
      cache: 'bounded',
      driver:ApolloDriver,
    }),
    ScheduleModule.forRoot(),
    SystemTestModule,
    HealthModule,
    RedisModule,
    NomicsModule,
    CryptoInfoModule,
    CryptoTickerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
