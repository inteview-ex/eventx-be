import { Transform, Type } from 'class-transformer'
import { ArrayNotEmpty, ArrayUnique, IsArray, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CryptoTickerFilter {
  @ApiProperty({
    required: true,
    description: 'test',
    example: 'BTC,ETH,XRP',
    type: String,
    uniqueItems:true,
    
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayUnique()
  @Type(() => String)
  @Transform((params) => {
    if (Array.isArray(params.value)) {
      const result = []
      params.value.forEach((e) => result.push(...e.split(',')))
      return result
    }
    return params.value.split(',')
  })
  tokens: string[]
}
