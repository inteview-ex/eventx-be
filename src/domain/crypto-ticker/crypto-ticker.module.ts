import { Module } from '@nestjs/common'
import { NomicsModule } from 'src/common/nomics/nomics.module'
import { RedisModule } from 'src/common/redis/redis.module'
import { CryptoTickerService } from './crypto-ticker.service'

@Module({
  imports: [NomicsModule, RedisModule],
  providers: [CryptoTickerService],
  exports: [CryptoTickerService],
})
export class CryptoTickerModule {}
