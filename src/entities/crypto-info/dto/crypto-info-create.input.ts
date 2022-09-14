import { Field, ID, InputType } from '@nestjs/graphql'
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator'

@InputType()
export class CryptoInfoCreateInput {
  @IsNotEmpty()
  @IsUUID('4')
  @Field((_) => ID)
  societyId: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @Field()
  title: string

  @IsNotEmpty()
  @IsString()
  @Length(1,240)
  @Field()
  instruction: string

  // @IsOptional()
  // @IsEnum(CommonStatus)
  // @Field((_) => CommonStatus,{nullable:true, defaultValue:CommonStatus.ACTIVE})
  // status: CommonStatus

  // @IsNotEmpty()
  // @IsEnum(CryptoInfoType)
  // @Field((_) => CryptoInfoType)
  // type: CryptoInfoType

}

