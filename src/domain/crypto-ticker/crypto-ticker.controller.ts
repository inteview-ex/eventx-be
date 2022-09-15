import { CacheInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common'
import { CryptoInfo } from 'src/entities/crypto-info/crypto-info.entity'
import { CryptoTickerService } from './crypto-ticker.service'
import { CryptoTickerFilter } from './dto/crypto-ticker.filter'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

@ApiTags('CryptoTicker')
@UseInterceptors(CacheInterceptor)
@Controller('crypto-ticker')
export class CryptoTickerController {
  constructor(private readonly cryptoTickerService: CryptoTickerService) {}

  @ApiOkResponse({
    description: 'Crypto tickers info based on filter.',
    type: [CryptoInfo],
  })
  @Get('/')
  async getTickers(@Query() dto: CryptoTickerFilter): Promise<CryptoInfo[]> {
    const datas = await this.cryptoTickerService.getTickers(dto.tokens ?? [])
    return datas
  }
}
