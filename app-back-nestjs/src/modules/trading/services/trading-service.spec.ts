import { Test } from '@nestjs/testing';
import { TradeDayData } from '../interfaces/TradeDayData';
import { TradingService } from './trading.service';

jest.mock('fs'); // Mock the 'fs' module

describe('TradingService', () => {
  let tradingService: TradingService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TradingService],
    }).compile();

    tradingService = moduleRef.get<TradingService>(TradingService);
  });

  describe('getAllTrading', () => {
    it('should return all trading data', () => {
      // Mocking the file read operation for testing purposes
      //jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify([]));

      const result = tradingService.getAllTrading();

      expect(result).toEqual([]);
    });
  });

  describe('getBestTimeToTradeWithAmountForCompany', () => {
    it('should return the best time to trade for the specified company with the given amount', () => {
     
      const company = 'GOOGLE';
      const amount = 1000;
      const data: TradeDayData[] = [
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
        },
      
      ];

      const result = tradingService.getBestTimeToTradeWithAmountForCompany(company, amount, data);

      const expected = {
        company: 'GOOGLE',
        amount : 1000,
        purchaseDate: 1646304000000 , //'03/03/2022'
        purchasePrice: 60,
        sellDate: 1648819200000 , //'01/04/2022'
        sellPrice: 180,
        profit: 120000,
      };

      expect(result).toEqual(expected);
    });
  });
});