import { calculateMonthlyAverage, findBestTimeToTradeForYear } from './trading.helpers';
import { TradeDayData } from '../interfaces/TradeDayData';
import { BestTimeToTrade } from '../interfaces/BestTimeToTrade';

describe('Trading Calculator', () => {
  const testData: TradeDayData[] = [
    {
      "company": "GOOGLE",
      "highestPriceOfTheDay": 150,
      "lowestPriceOfTheDay": 120,
      "timestamp": 1641186000000
    },
    {
      "company": "GOOGLE",
      "highestPriceOfTheDay": 160,
      "lowestPriceOfTheDay": 110,
      "timestamp": 1643937600000
    },
    {
      "company": "GOOGLE",
      "highestPriceOfTheDay": 70,
      "lowestPriceOfTheDay": 60,
      "timestamp": 1646304000000
    },
    {
      "company": "GOOGLE",
      "highestPriceOfTheDay": 180,
      "lowestPriceOfTheDay": 130,
      "timestamp": 1648819200000
    }
  ];

  it('should calculate monthly averages', async () => {
    const monthlyAverages = await calculateMonthlyAverage(testData);
    expect(monthlyAverages).toEqual([
      { month: 'Jan', average: 135 }, 
      { month: 'Feb', average: 135 }, 
      { month: 'Mar', average: 65 }, 
      { month: 'Apr', average: 155 }
    ]);
  });

  it('should find the best time to trade for the year', () => {
    const amount = 1000; // Montant investi

    const bestTimeToTrade: BestTimeToTrade = findBestTimeToTradeForYear('GOOGLE', amount, testData);

    const suspect = {
      amount: 1000,
      company: 'GOOGLE',
      purchasePrice: 60,
      purchaseDate: 1646304000000,
      sellDate: 1648819200000,
      sellPrice: 180,
      profit: 120000
    };
    expect(bestTimeToTrade).toEqual(suspect);
  });  

});
