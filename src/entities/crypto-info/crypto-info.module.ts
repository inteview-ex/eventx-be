import { Module } from '@nestjs/common'
import { CryptoInfoService } from './crypto-info.service'

@Module({
  imports: [],
  providers: [CryptoInfoService],
  exports: [CryptoInfoService],
})
export class CryptoInfoModule {}
