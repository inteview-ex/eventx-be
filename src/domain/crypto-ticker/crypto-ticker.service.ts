import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class CryptoTickerService {
  constructor(

  ) {}
  private readonly logger = new Logger(CryptoTickerService.name);


  @Cron('*/5 * * * * *')
  handleCron() {
    this.logger.debug('Called per 5 seconds');
  }
}