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
    const instanceId = this.configService.get('NODE_APP_INSTANCE')
    console.log("instanceId", instanceId)
    if(!instanceId || instanceId === null){
      this.isMainNode = true
    }else if(instanceId === "0"){
      this.isMainNode = true 
    }
    console.log("isMainNode", this.isMainNode)
  }
  // private readonly isMainNode = this.configService.get('NODE_APP_INSTANCE') === "0"
  // private readonly logger = new Logger(CronTasksService.name);

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