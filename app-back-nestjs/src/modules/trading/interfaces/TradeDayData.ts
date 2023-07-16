export interface TradeDayData {
  company: string;            // Le nom de la société
  highestPriceOfTheDay: number;  // Le prix le plus élevé de la journée
  lowestPriceOfTheDay: number;   // Le prix le plus bas de la journée
  timestamp: number;          // La date de la journée au format timestamp
}