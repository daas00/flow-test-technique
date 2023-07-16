export interface BestTimeToTrade {
  company: string;          // Le nom de la société
  amount : number;           // montant a investire
  purchaseDate: number;     // La date d'achat au format timestamp
  purchasePrice: number;    // Le prix d'achat
  sellDate: number;         // La date de vente au format timestamp
  sellPrice: number;        // Le prix de vente
  profit: number;           // Le profit réalisé
}