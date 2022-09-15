import { Module } from '@nestjs/common'
import { NomicsModule } from 'src/common/nomics/nomics.module'
import { RedisModule } from 'src/common/redis/redis.module'
import { CryptoTickerController } from './crypto-ticker.controller'
import { CryptoTickerGateway } from './crypto-ticker.gateway'
import { CryptoTickerService } from './crypto-ticker.service'

@Module({
  imports: [NomicsModule, RedisModule,],
  providers: [CryptoTickerService, CryptoTickerGateway],
  controllers:[CryptoTickerController],
  exports: [CryptoTickerService, CryptoTickerGateway],
})
export class CryptoTickerModule {}
