import React from "react";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';

const formatDate = (date: number) => {
    return dayjs(date).format('DD/MM/YYYY');
};
const BestTimeToTrade = (props) => {
  const { bestTimeToTradeData } = props;
  const { t } = useTranslation();

  return (
    <>
      {/* Display the best time to trade data */}
      {bestTimeToTradeData.company && (
        <>
          <h2>{t("bestTimeToTrade")}</h2>
          <div>
            <p>
              {t("buyAction", {
                amount: bestTimeToTradeData.amount,
                company: bestTimeToTradeData.company,
                purchaseDate: formatDate(bestTimeToTradeData.purchaseDate),
                purchasePrice: bestTimeToTradeData.purchasePrice,
              })}
            </p>
            <p>
              {t("sellAction", {
                sellDate: formatDate(bestTimeToTradeData.sellDate),
                sellPrice: bestTimeToTradeData.sellPrice,
                profit: bestTimeToTradeData.profit,
              })}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default BestTimeToTrade;
