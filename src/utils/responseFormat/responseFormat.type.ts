import { Field, InterfaceType, ObjectType } from '@nestjs/graphql'
import { PaginationOutputType } from '../pagination/pagination.type'

@InterfaceType('ResponseFormat')
export abstract class ResponseFormatType {
  @Field()
  isSuccess: boolean

  @Field()
  code: number

  @Field({ nullable: true })
  errorMessage?: string

  // @Field({nullable:true})
  // data?:string

  @Field({ nullable: true })
  pagination?: PaginationOutputType
}

@ObjectType('DefaultResponseFormatOutput', {
  implements: () => [ResponseFormatType],
})
export class DefaultResponseFormatOutputType {
  @Field()
  isSuccess: boolean

  @Field()
  code: number

  @Field({ nullable: true })
  errorMessage?: string

  @Field({ nullable: true })
  pagination?: PaginationOutputType
}
