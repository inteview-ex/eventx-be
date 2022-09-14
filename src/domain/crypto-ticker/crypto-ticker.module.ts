import { Module } from '@nestjs/common'
import { NomicsModule } from 'src/common/nomics/nomics.module'
import { RedisModule } from 'src/common/redis/redis.module'
import { CryptoTickerController } from './crypto-ticker.controller'
import { CryptoTickerService } from './crypto-ticker.service'

@Module({
  imports: [NomicsModule, RedisModule],
  providers: [CryptoTickerService],
  controllers:[CryptoTickerController],
  exports: [CryptoTickerService],
})
export class CryptoTickerModule {}
