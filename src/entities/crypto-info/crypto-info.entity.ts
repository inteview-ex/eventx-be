import { TimeInterval } from './enum/time-interval.enum'
import {ApiProperty, ApiExtraModels} from "@nestjs/swagger"

export class CryptoIntervalInfo {
  @ApiProperty()
  volume: string

  @ApiProperty()
  price_change: string

  @ApiProperty()
  price_change_pct: string

  @ApiProperty()
  volume_change: string

  @ApiProperty()
  volume_change_pct: string

  @ApiProperty()
  market_cap_change?: string

  @ApiProperty()
  market_cap_change_pct?: string
}

export class CryptoInfo {
  @ApiProperty()
  id: string

  @ApiProperty()
  currency: string

  @ApiProperty()
  symbol: string

  @ApiProperty()
  name?: string

  @ApiProperty()
  logo_url?: string

  @ApiProperty()
  price: string

  @ApiProperty()
  max_supply?: string

  @ApiProperty()
  market_cap?: string;

  @ApiProperty()
  [TimeInterval.Hour]?: CryptoIntervalInfo;

  @ApiProperty()
  [TimeInterval.Day]?: CryptoIntervalInfo;

  @ApiProperty()
  [TimeInterval.Week]?: CryptoIntervalInfo;

  @ApiProperty()
  [TimeInterval.Month]?: CryptoIntervalInfo;

  @ApiProperty()
  [TimeInterval.Year]?: CryptoIntervalInfo

  constructor(data?: CryptoInfo) {
    Object.assign(this, data)
  }
}
