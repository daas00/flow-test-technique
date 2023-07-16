import { Module } from '@nestjs/common';
import { TradingModule } from './modules/trading/trading.module';

@Module({
  imports: [TradingModule],// Import du module TradingModule dans l'application
  controllers: [],
  providers: [],
})
export class AppModule {}
