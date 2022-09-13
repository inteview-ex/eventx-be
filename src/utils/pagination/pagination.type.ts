import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('PaginationOutput')
export class PaginationOutputType {
  @Field()
  count: number

  @Field()
  page: number

  @Field()
  totalPages: number

  @Field()
  offset: number

  @Field()
  limit: number
}
