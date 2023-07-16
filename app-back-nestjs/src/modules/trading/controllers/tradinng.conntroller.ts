import { Body, Controller, Get, Post } from '@nestjs/common';
import { TradingActionDto } from '../dtos/trading-action.dto';
import { BestTimeToTrade } from '../interfaces/BestTimeToTrade';
import { TradingService } from '../services/trading.service';

@Controller('trading')
export class TradingController {
  constructor(private readonly tradingService: TradingService) {}

  // Endpoint pour calculer les moyennes mensuelles pour chaque société
  @Get('monthly-average')
  async calculateMonthlyAverages(): Promise<{ company: string; monthlyAverages: { month: string; average: number }[] }[]> {
    // Liste des sociétés pour lesquelles nous calculerons les moyennes mensuelles
    const companies = ['GOOGLE', 'AMAZON'];

    // Récupérer toutes les données de trading depuis le service
    const tradeData = this.tradingService.getAllTrading();

    // Créer un tableau de promesses pour calculer les moyennes mensuelles de chaque société
    const resultPromises = companies.map(async (company) => {
      // Filtrer les données de trading pour la société spécifiée
      const companyData = tradeData.filter((item) => item.company === company);

      // Calculer la moyenne mensuelle de cette société en utilisant la fonction asynchrone dans le service
      const monthlyAverages = await this.tradingService.getMonthlyAverage(companyData);

      // Retourner les résultats sous forme de promesse résolue avec la société et les moyennes mensuelles
      return { company, monthlyAverages };
    });

    // Attendre que toutes les promesses soient résolues et renvoyer le résultat final
    return Promise.all(resultPromises);
  }

  // Endpoint pour obtenir le meilleur moment pour trader en fonction d'une action d'achat/vente 
  @Post('best-time-to-trade')
  getBestTimeToTrade(@Body() createCatDto: TradingActionDto): BestTimeToTrade {
    // Récupérer toutes les données de trading depuis le service
    const tradeData = this.tradingService.getAllTrading();

    // Filtrer les données de trading pour la société spécifiée dans l'action d'achat/vente
    const companyData = tradeData.filter((item) => item.company === createCatDto.company);

    // Obtenir le meilleur moment pour trader en utilisant la fonction dans le service
    const bestTimeToTrade: BestTimeToTrade = this.tradingService.getBestTimeToTradeWithAmountForCompany(
      createCatDto.company,
      createCatDto.amount,
      companyData,
    );

    return bestTimeToTrade;
  }
}
