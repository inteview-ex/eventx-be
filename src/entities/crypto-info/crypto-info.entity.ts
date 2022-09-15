import { TimeInterval } from './enum/time-interval.enum'

export class CryptoIntervalInfo {
  volume: string

  price_change: string

  price_change_pct: string

  volume_change: string

  volume_change_pct: string

  market_cap_change?: string

  market_cap_change_pct?: string
}

export class CryptoInfo {
  id: string

  currency: string

  symbol: string

  name?: string

  logo_url?: string

  price: string

  max_supply?: string

  market_cap?: string;

  [TimeInterval.Hour]?: CryptoIntervalInfo;

  [TimeInterval.Day]?: CryptoIntervalInfo;

  [TimeInterval.Week]?: CryptoIntervalInfo;

  [TimeInterval.Month]?: CryptoIntervalInfo;

  [TimeInterval.Year]?: CryptoIntervalInfo

  constructor(data?: CryptoInfo) {
    Object.assign(this, data)
  }
}
