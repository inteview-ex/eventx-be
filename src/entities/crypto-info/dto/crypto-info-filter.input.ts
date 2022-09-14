import { Field, ID, InputType } from '@nestjs/graphql'
import {  IsEnum, IsOptional, IsUUID } from 'class-validator'
import { BaseNodeFilterInput } from 'src/entities/base/node-interface/base-node.input'

@InputType()
export class CryptoInfoFilterInput extends BaseNodeFilterInput {
  // @IsOptional()
  // @IsUUID('4', { each: true })
  // @Field((_) => [ID], { nullable: true })
  // cryptoInfoIds?: string[] = null

  // @IsOptional()
  // @IsUUID('4', { each: true })
  // @Field((_) => [ID], { nullable: true })
  // societyIds?: string[] = null

  // @IsOptional()
  // @IsUUID('4')
  // @Field((_) => ID, { nullable: true })
  // societyId?: string = null

  // @IsOptional()
  // @IsEnum(CommonStatus, { each: true })
  // @Field((_) => [CommonStatus], { nullable: true })
  // statuses?: CommonStatus[] = null

  // @IsOptional()
  // @IsEnum(CryptoInfoType, { each: true })
  // @Field((_) => [CryptoInfoType], { nullable: true })
  // types?: CryptoInfoType[] = null
}
