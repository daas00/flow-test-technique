import { BestTimeToTrade } from "../interfaces/BestTimeToTrade";
import { MonthlyAveragesData } from "../interfaces/MonthlyAveragesData";

// Définition de l'URL de l'API
const API_URL = "http://localhost:3001/trading";

// Fonction pour récupérer les moyennes mensuelles depuis l'API
export const fetchMonthlyAveragesData = async (): Promise<MonthlyAveragesData[]> => {
  const response = await fetch(`${API_URL}/monthly-average`);
  if (!response.ok) {
    throw new Error("Failed to fetch monthly averages data.");
  }
  return response.json();
};

// Fonction pour envoyer les données pour obtenir le meilleur moment pour trader avec un montant spécifique
export const fetchBestTimeToTradeData = async (
  company: string,
  amount: number
): Promise<BestTimeToTrade> => {
  const response = await fetch(`${API_URL}/best-time-to-trade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company,
      amount,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch best time to trade data.");
  }

  return response.json();
};
