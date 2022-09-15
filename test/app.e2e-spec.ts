import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from '../src/app.module'
import axios, { AxiosInstance } from 'axios'
import { CryptoInfo } from 'src/entities/crypto-info/crypto-info.entity'
import { TimeInterval } from 'src/entities/crypto-info/enum/time-interval.enum'

describe('AppController (e2e)', () => {
  let moduleRef: TestingModule
  let app: INestApplication
  let axiosInstance: AxiosInstance
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      })
    )
    await app.init()
    const port = process.env.PORT || 3001
    await app.listen(port)
    const url = await app.getUrl()
    axiosInstance = axios.create({
      baseURL: url,
      timeout: 3000,
    })
  })

  describe('Public endpoint test', () => {
    it('should return crypto infos', async () => {
      const watchlist = ["BTC","ETH","LTC","XMR","XRP","DOGE","DASH","MAID","LSK","SJCX"]
      const result = await axiosInstance.get<CryptoInfo[]>(
        `/crypto-ticker?tokens=${watchlist.join(",")}`
      )
      expect(result.status).toBe(200)
      expect(result.data).toBeDefined()
      expect(result.data).toHaveLength(watchlist.length)
      const ticker = result.data[0]
      expect(ticker.id).toBeDefined()
      expect(ticker.currency).toBeDefined()
      expect(ticker.symbol).toBeDefined()
      const intervalData =
        ticker[TimeInterval.Hour] ||
        ticker[TimeInterval.Day] ||
        ticker[TimeInterval.Week] ||
        ticker[TimeInterval.Month] ||
        ticker[TimeInterval.Year]
      expect(intervalData).toBeDefined()
      expect(intervalData.price_change).toBeDefined()
      expect(intervalData.price_change_pct).toBeDefined()
      expect(intervalData.volume).toBeDefined()
      expect(intervalData.volume_change).toBeDefined()
      expect(intervalData.volume_change_pct).toBeDefined()
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
