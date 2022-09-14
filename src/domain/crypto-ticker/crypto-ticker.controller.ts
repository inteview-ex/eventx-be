import { Controller, Get, Query } from '@nestjs/common'
import { CryptoInfo } from 'src/entities/crypto-info/crypto-info.entity'
import { CryptoTickerService } from './crypto-ticker.service'
import { CryptoTickerFilter } from './dto/crypto-ticker.filter'

@Controller('crypto-ticker')
export class CryptoTickerController {
  constructor(private readonly cryptoTickerService: CryptoTickerService) {}

  @Get('/')
  //   example: /crypto-ticker?tokens=BTC,ETH&tokens=XRP
  async getTickers(@Query() dto: CryptoTickerFilter): Promise<CryptoInfo[]> {
    const datas = await this.cryptoTickerService.getTickers(dto.tokens ?? [])
    return datas
  }
}
