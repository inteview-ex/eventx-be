import { registerEnumType } from '@nestjs/graphql'

export enum CryptoInfoType {
  CASH = 'CASH',
  BANK = 'BANK',
  GATEWAY = 'GATEWAY',
}

registerEnumType(CryptoInfoType, {
  name: 'CryptoInfoType',
  description: 'The supported society membership type',
})
