import { Field, ObjectType } from '@nestjs/graphql'
import { ResponseFormatType } from 'src/utils/responseFormat/responseFormat.type'
import { CryptoInfoGQLType } from '../crypto-info.type'

@ObjectType('CryptoInfoOutput', {
  implements: () => [ResponseFormatType],
})
export class CryptoInfoOutputType {
  @Field()
  isSuccess: boolean

  @Field()
  code: number

  @Field({ nullable: true })
  errorMessage?: string

  @Field((_) => CryptoInfoGQLType, { nullable: true })
  data?: CryptoInfoGQLType
}

@ObjectType('CryptoInfoArrayOutput', {
  implements: () => [ResponseFormatType],
})
export class CryptoInfoArrayOutputType {
  @Field()
  isSuccess: boolean

  @Field()
  code: number

  @Field({ nullable: true })
  errorMessage?: string

  @Field((_) => [CryptoInfoGQLType], {
    nullable: true,
    defaultValue: [],
  })
  data?: CryptoInfoGQLType[]
}
