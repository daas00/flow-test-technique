import { BestTimeToTrade } from '../interfaces/BestTimeToTrade';
import { TradeDayData } from '../interfaces/TradeDayData';

const _ = require('lodash');
const dayjs = require('dayjs');

// Fonction pour calculer la moyenne mensuelle des prix pour une liste de données TradeDayData
// Retourne une promesse résolue avec un tableau d'objets contenant le mois et la moyenne des prix
export async function calculateMonthlyAverage(
  data: TradeDayData[],
): Promise<{ month: string; average: number }[]> {
  // Grouper les données par mois en utilisant la bibliothèque lodash et la fonction dayjs pour formater la date
  const groupedData = _.groupBy(data, (item) =>
    dayjs(item.timestamp).format('MMM'),
  );

  // Calculer la moyenne des prix pour chaque mois et formater le résultat
  return _.map(groupedData, (monthData, month) => {
    const average = _.meanBy(
      monthData,
      (item) => (item.highestPriceOfTheDay + item.lowestPriceOfTheDay) / 2,
    );
    // La méthode +average.toFixed(2) arrondit le résultat à deux décimales
    return { month, average: +average.toFixed(2) };
  });
}

// Fonction pour trouver le meilleur moment pour acheter et vendre des actions sur une année donnée
// Retourne un objet BestTimeToTrade contenant les informations sur le meilleur moment pour trader
export function findBestTimeToTradeForYear(
  company: string,
  amount: number,
  data: TradeDayData[],
): BestTimeToTrade {
  // Variables pour stocker le profit maximum et les informations sur le meilleur moment de trading
  let maxProfit: number = 0;
  let purchasePrice: number = 0;
  let bestSellPrice: number = 0;
  let bestBuyDate: number;
  let bestSellDate: number;

  // Boucle pour comparer les prix d'achat et de vente de chaque jour et trouver le profit maximum
  for (let i = 0; i < data.length; i++) {
    const buyData = data[i];
    const buyPrice = buyData.lowestPriceOfTheDay;

    for (let j = i; j < data.length; j++) {
      const sellData = data[j];
      const sellPrice = sellData.highestPriceOfTheDay;
      const profit = (sellPrice - buyPrice) * amount;

      // Si le profit calculé est supérieur au profit maximum précédent, mettre à jour les valeurs
      if (profit > maxProfit) {
        maxProfit = profit;
        bestBuyDate = buyData.timestamp;
        bestSellDate = sellData.timestamp;
        purchasePrice = buyPrice;
        bestSellPrice = sellPrice;
      }
    }
  }

  // Retourner un objet contenant les informations sur le meilleur moment pour trader
  return {
    amount,
    company,
    purchasePrice,
    purchaseDate: bestBuyDate,
    sellDate: bestSellDate,
    sellPrice: bestSellPrice,
    profit: +maxProfit.toFixed(2),
  };
}
