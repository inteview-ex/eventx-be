import { Module } from '@nestjs/common'
import { CryptoInfoService } from './crypto-info.service'
import { CryptoInfo } from './crypto-info.entity'

@Module({
  imports: [],
  providers: [CryptoInfoService],
  exports: [CryptoInfoService],
})
export class CryptoInfoModule {}
