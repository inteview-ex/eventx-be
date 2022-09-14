import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm'
import { BaseNodeEntity } from '../base/node-interface/base-node-entity'
import { TimeInterval } from './enum/time-interval.enum';

export class CryptoIntervalInfo {
  @Column()
  volume: string;

  @Column()
  price_change: string;

  @Column()
  price_change_pct: string;

  @Column()
  volume_change: string;

  @Column()
  volume_change_pct: string;

  @Column()
  market_cap_change?: string;

  @Column()
  market_cap_change_pct?: string;

}
@Entity()
export class CryptoInfo extends BaseNodeEntity {
  @ObjectIdColumn()
  _id?: ObjectID

  @PrimaryColumn()
  id: string

  @Column()
  currency: string;

  @Column()
  symbol: string;

  @Column()
  name?: string;

  @Column()
  logo_url?: string;

  @Column()
  price: string;

  @Column()
  max_supply?: string;

  @Column()
  market_cap?: string;

  @Column()
  [TimeInterval.Hour]?:CryptoIntervalInfo

  @Column()
  [TimeInterval.Day]?:CryptoIntervalInfo

  @Column()
  [TimeInterval.Week]?:CryptoIntervalInfo

  @Column()
  [TimeInterval.Month]?:CryptoIntervalInfo

  @Column()
  [TimeInterval.Year]?:CryptoIntervalInfo

  constructor(data?: CryptoInfo) {
    super()
    Object.assign(this, data)
  }
}
