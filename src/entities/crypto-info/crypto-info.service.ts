import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { CryptoInfo } from './crypto-info.entity'

@Injectable()
export class CryptoInfoService {
  constructor(
    @InjectRepository(CryptoInfo)
    private readonly cryptoInfoRepository: MongoRepository<CryptoInfo>
  ) {}

  // async testWrite() {
  //   const newCryptoInfo = new CryptoInfo({
  //     id:'BTC',
  //     currency: 'BTC',
  //     symbol: 'BTC',
  //     name: 'Bitcoin',
  //     logo_url:
  //       'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg',
  //     price: '22330.35490444',
  //     '1d': {
  //       volume: '13224806394351.69',
  //       price_change: '-25067.82312619',
  //       price_change_pct: '-0.5291',
  //       volume_change: '-5808843703215.91',
  //       volume_change_pct: '-0.3052',
  //       market_cap_change: '-468982002372.49',
  //       market_cap_change_pct: '-0.5233',
  //     },
  //   })
  //   const createResult = await this.cryptoInfoRepository.save(newCryptoInfo)
  //   console.log('testWrite', createResult)
  // }

  // async testRead() {
  //   const results = await this.cryptoInfoRepository.find()
  //   console.log('testRead', results)
  //   return results
  // }
}
