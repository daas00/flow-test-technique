import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { calculateMonthlyAverage, findBestTimeToTradeForYear } from '../helpers/trading.helpers';
import { BestTimeToTrade } from '../interfaces/BestTimeToTrade';
import { TradeDayData } from '../interfaces/TradeDayData';
const dayjs = require('dayjs');

@Injectable()
export class TradingService {
  // Chemin vers le fichier JSON contenant les données de trading
  private readonly filePath = join(
    process.cwd(),
    'assets',
    'data',
    'stockPrices.json',
  );

  // Méthode pour récupérer toutes les données de trading
  getAllTrading(): TradeDayData[] {
    // Lire le contenu du fichier JSON
    const rawData = fs.readFileSync(this.filePath, 'utf8');
    // Si des données existent, les convertir en tableau d'objets TradeDayData
    if (rawData){
      const jsonData: TradeDayData[] = JSON.parse(rawData);
      return jsonData;
    } else return [];
  }

  // Méthode asynchrone pour calculer les moyennes mensuelles pour une société spécifique
  async getMonthlyAverage(companyData: TradeDayData[]): Promise<{ month: string; average: number }[]> {
    // Calculez la moyenne mensuelle de cette société en utilisant la fonction asynchrone calculateMonthlyAverage
    const monthlyAverages = await calculateMonthlyAverage(companyData);
    return monthlyAverages;
  }

  // Méthode pour obtenir le meilleur moment pour acheter et vendre avec un montant investi pour une société spécifique
  getBestTimeToTradeWithAmountForCompany(company: string, amount: number, data: TradeDayData[]): BestTimeToTrade {
    // Récupérer les données pour la société spécifiée en filtrant les données de trading
    const filteredData = data.filter((item) => item.company === company);
    // Utiliser la fonction findBestTimeToTradeForYear pour trouver le meilleur moment pour trader
    const bestTimeToTrade = findBestTimeToTradeForYear(company, amount, filteredData);
    return bestTimeToTrade;
  }
}