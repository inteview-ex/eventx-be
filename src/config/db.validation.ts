import { plainToInstance } from 'class-transformer'
import { IsNumber, IsOptional, IsString, validateSync } from 'class-validator'

class EnvironmentVariables {

  @IsString()
  REDIS_HOST: string

  @IsNumber()
  REDIS_PORT: number
}

export function validateDBConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
