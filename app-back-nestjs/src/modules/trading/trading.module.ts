import { Module } from '@nestjs/common';
import { TradingController } from './controllers/tradinng.conntroller';
import { TradingService } from './services/trading.service'; 

@Module({
  controllers: [TradingController], // Déclaration du contrôleur TradingController dans le module
  providers: [TradingService], // Déclaration du service TradingService dans le module
})
export class TradingModule {} // Déclaration du module TradingModule
