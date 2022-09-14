import { Module } from '@nestjs/common';
import { CryptoTickerService } from './crypto-ticker.service';

@Module({
    providers:[CryptoTickerService],
    exports:[CryptoTickerService]
})
export class CryptoTickerModule {}
