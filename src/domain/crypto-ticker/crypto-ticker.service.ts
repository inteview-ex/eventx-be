import { Injectable, Logger } from '@nestjs/common'
import { IRawCurrencyTicker } from 'nomics'
import { NomicsService } from 'src/common/nomics/nomics'
import { RedisService } from 'src/common/redis/redis.service'
import { CryptoInfo } from 'src/entities/crypto-info/crypto-info.entity'
import { TimeInterval } from 'src/entities/crypto-info/enum/time-interval.enum'
import { ArraySplitToChunks } from 'src/utils/arrayToChunk'
import { CRYPTO_TICKERS } from './enums'

@Injectable()
export class CryptoTickerService {
  constructor(
    private readonly nomicsService: NomicsService,
    private readonly redisService: RedisService,
    
  ) {}
  private readonly logger = new Logger(CryptoTickerService.name)
  private readonly tokenList: string[] = [
    'BTC',
    'ETH',
    'LTC',
    'XMR',
    'XRP',
    'DOGE',
    'DASH',
    'MAID',
    'LSK',
    'SJCX',
  ]
  async getAllTickers(){
    const redisClient = await this.redisService.getRedisClient()
    const outputs: CryptoInfo[] = []
    const keys = await redisClient.keys(`${CRYPTO_TICKERS}-*`)
    const results = await redisClient.mGet(keys)
    results.forEach((e) =>{
      if(e !== null){
          outputs.push(JSON.parse(e))
      }
  })
  return outputs
  }
  async getTickers(watchlist: string[]) {
    // no watchlist, stop here
    if (watchlist.length < 1) {
      return []
    }
    const redisClient = await this.redisService.getRedisClient()
    const keys = watchlist.map((e) => this.getTickerKeyFromSymbol(e))
    const outputs: CryptoInfo[] = []
    const results = await redisClient.mGet(keys)
    results.forEach((e) =>{
        if(e !== null){
            outputs.push(JSON.parse(e))
        }
    })
    return outputs
  }

  async fetchAndUpdateTickers() {
    let cryptoInfos:CryptoInfo[] = []
    try {
      this.logger.debug('start fetchAndUpdateTickers')
      // get watchlist from db
      const watchlist = this.tokenList

      // get api from nomics
      const tickers = await this.getLatestCryptoDataFromAPI(watchlist)
      cryptoInfos = this.apiDatasCleaning(tickers) ?? []
      this.logger.debug(`get ${tickers.length} api data from nomics`)

      // save in db

      // save in redis cache
      await this.updateCryptoInfoToRedisCache(cryptoInfos)
      this.logger.debug('updated redis cache')
      this.logger.debug('end fetchAndUpdateTickers')
    } catch (error) {
      this.logger.error(error)
      this.logger.error(JSON.stringify(error))
    }
    return cryptoInfos
  }

  async getLatestCryptoDataFromAPI(
    tokenList: string[]
  ): Promise<IRawCurrencyTicker[]> {
    const nomicsClient = this.nomicsService.getNomicsClient()
    const tickerResults: IRawCurrencyTicker[] = []
    const tokenListChunks = ArraySplitToChunks(tokenList, 100)
    for (let i = 0; i < tokenListChunks.length; i++) {
      const tokenChunk = tokenListChunks[i]
      const result = await nomicsClient.currenciesTicker({
        ids: tokenChunk,
        interval: [
          TimeInterval.Hour,
          TimeInterval.Day,
          TimeInterval.Week,
          TimeInterval.Month,
          TimeInterval.Year,
        ],
        convert: 'USD',
      })
      tickerResults.push(...result)
    }
    // console.log('tickerResults', tickerResults)
    return tickerResults
  }

  async updateCryptoInfoToRedisCache(infos: CryptoInfo[]) {
    const redisClient = await this.redisService.getRedisClient()
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i]
      const key = this.getKeyFromTicker(info)
      const value = JSON.stringify(info)
      const result = await redisClient.set(key, value)
    }
  }

  apiDatasCleaning(tickers:IRawCurrencyTicker[]):CryptoInfo[]{
    const results:CryptoInfo[] = []
    tickers.forEach(e=>results.push(new CryptoInfo({
        id:e.id,
        symbol:e.symbol,
        currency:e.currency,
        price:e.price,
        name:e.name,
        logo_url:e.logo_url,
        market_cap:e.market_cap,
        max_supply:e.max_supply,
        [TimeInterval.Hour]:e[TimeInterval.Hour],
        [TimeInterval.Day]:e[TimeInterval.Day],
        [TimeInterval.Week]:e[TimeInterval.Week],
        [TimeInterval.Month]:e[TimeInterval.Month],
        [TimeInterval.Year]:e[TimeInterval.Year],
    })))
    return results
  }

  getKeyFromTicker(ticker: IRawCurrencyTicker|CryptoInfo) {
    return `${CRYPTO_TICKERS}-${ticker.symbol}`
  }

  getTickerKeyFromSymbol(symbol: string) {
    return `${CRYPTO_TICKERS}-${symbol}`
  }
}
