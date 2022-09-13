import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PaginationInput {
  @Field({ nullable: true, defaultValue: 0 })
  offset?: number = 0 // skipped results

  // will be autp calculated
  skip?: number = 0
  take?: number = 0

  @Field({ nullable: true, defaultValue: 1 })
  page?: number = 1 // current page

  @Field({ nullable: true, defaultValue: 10 })
  limit?: number = 10 // result per page
  constructor(data?: Partial<PaginationInput>) {
    Object.assign(this, data)
  }
}
