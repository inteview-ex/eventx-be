import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus'
import {ApiExcludeController} from "@nestjs/swagger"


@ApiExcludeController(true)
@Controller('/')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {}

  @Get('/')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('google', 'https://google.com'),
    ])
  }
}
