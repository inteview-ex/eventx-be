import { Module } from '@nestjs/common'
import { CryptoTickerModule } from '../crypto-ticker/crypto-ticker.module';
import { CronTasksService } from './cron-tasks.service';

@Module({
  imports: [CryptoTickerModule],
  providers: [CronTasksService,],
  exports: [],
})
export class CronTasksModule {}
