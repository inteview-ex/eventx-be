import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { PaginationInput } from 'src/utils/pagination/pagination.input'

@InputType()
export class BaseNodeFilterInput {
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationInput)
  @Field(() => PaginationInput, { nullable: true })
  pagination?: PaginationInput
}
