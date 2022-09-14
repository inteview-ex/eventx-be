import { Module } from '@nestjs/common'
import { CryptoInfoService } from './crypto-info.service'
import { CryptoInfo } from './crypto-info.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([CryptoInfo])],
  providers: [CryptoInfoService],
  exports: [CryptoInfoService],
})
export class CryptoInfoModule {}
