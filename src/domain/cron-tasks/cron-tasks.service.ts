import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CryptoTickerGateway } from '../crypto-ticker/crypto-ticker.gateway';
import { CryptoTickerService } from '../crypto-ticker/crypto-ticker.service';

@Injectable()
export class CronTasksService implements OnModuleInit {
  constructor(
    private readonly configService:ConfigService,
    private readonly cryptoTickerService:CryptoTickerService,
    private readonly cryptoTickerGateway:CryptoTickerGateway
  ){}
  private isMainNode:boolean = false
  onModuleInit() {
    const _isMainNode = this.configService.get<boolean>('isMainNode')
    this.isMainNode = _isMainNode
  }

  @Cron('*/1 * * * *') //every one minute
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCronGetCryptoAPI() {
    if(this.isMainNode){
      await this.cryptoTickerService.fetchAndUpdateTickers()
    }
  }

  @Cron('30 */1 * * * *') //every one minute & 30 sec
  async handleCronBroadcastTicker() {
    const cryptoInfos = await this.cryptoTickerService.getAllTickers()
    await this.cryptoTickerGateway._boardcastCryptoTicker(cryptoInfos)
  }

}