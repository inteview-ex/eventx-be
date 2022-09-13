import { Module } from '@nestjs/common'
import { NomicsService } from './nomics'

@Module({
  providers: [NomicsService],
  exports: [NomicsService],
})
export class NomicsModule {}
