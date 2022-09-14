import { Field, ID, InputType, PartialType, PickType } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { CryptoInfoCreateInput } from './crypto-info-create.input'

// @InputType()
// export class CryptoInfoUpdateInput extends PartialType(
//   PickType(CryptoInfoCreateInput, ['instruction', 'status',"title"] as const)
// ) {
//   @IsNotEmpty()
//   @IsUUID('4')
//   @Field((_) => ID)
//   cryptoInfoId: string
// }

@InputType()
export class CryptoInfoUpdateInput{
  @IsNotEmpty()
  @IsUUID('4')
  @Field((_) => ID)
  cryptoInfoId: string
}
