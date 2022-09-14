import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { IRawCurrencyTicker } from 'nomics'
import { NomicsService } from 'src/common/nomics/nomics'
import { RedisService } from 'src/common/redis/redis.service'
import { TimeInterval } from 'src/entities/crypto-info/enum/time-interval.enum'
import { ArraySplitToChunks } from 'src/utils/arrayToChunk'
import { CRYPTO_TICKERS } from '../enums'

@Injectable()
export class CryptoTickerService {
  constructor(
    private readonly nomicsService: NomicsService,
    private readonly redisService: RedisService
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

  @Cron('*/1 * * * *')
  async handleCron() {
    this.logger.debug('Called per 1 minutes')
    // await this.fetchAndUpdateTickers()
  }
  async getTickers(watchlist:string[]){
    // no watchlist, stop here
    if(watchlist.length < 1){
        return []
    }
    const redisClient = await this.redisService.getRedisClient()
    const keys = watchlist.map(e=>this.getTickerKeyFromId(e))
    const outputs:IRawCurrencyTicker[] = []
    const results = await redisClient.mGet(keys)
    results.forEach(e=>outputs.push(JSON.parse(e)))
    return outputs
  }
  async fetchAndUpdateTickers() {
    try {
        this.logger.debug("start fetchAndUpdateTickers")
      // get watchlist from db
      const watchlist = this.tokenList

      // get api from nomics
      const tickers = await this.getLatestCryptoDataFromAPI(watchlist)
      this.logger.debug(`get ${tickers.length} api data from nomics`)

      // save in db

      // save in redis cache
      await this.updateRawToRedisCache(tickers)
      this.logger.debug("updated redis cache")
      this.logger.debug("end fetchAndUpdateTickers")
    } catch (error) {
        this.logger.error(error)
    }
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

  async updateRawToRedisCache(tickers: IRawCurrencyTicker[]) {
    const redisClient = await this.redisService.getRedisClient()
    for (let i = 0; i < tickers.length; i++) {
      const ticker = tickers[i]
      const key = this.getKeyFromTicker(ticker)
      const value = JSON.stringify(ticker)
      const result = await redisClient.set(key, value)
      console.log("result", result)
    }
  }

  getKeyFromTicker(ticker: IRawCurrencyTicker) {
    return `${CRYPTO_TICKERS}-${ticker.id}`
  }

  getTickerKeyFromId(id: string) {
    return `${CRYPTO_TICKERS}-${id}`
  }
}
