import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "Evolution of stock prices for Amazon and Google in 2023",
        loading: "Loading...",
        error: "Error: {{errorMessage}}",
        bestTimeToTrade: {
          buyInfo:
            "You should buy {{amount}} shares of {{company}} on {{purchaseDate}} at the price of {{purchasePrice}} euro",
          sellInfo:
            "Then, you should sell these shares on {{sellDate}} at the price of {{sellPrice}} euro to make a profit of {{profit}} euro",
        },
        bestTimeToTrade: "Best Time To Trade",
        buyAction:
          "vous devrait acheter {{amount}} d'action {{company}} le {{purchaseDate}} au prix de {{purchasePrice}} euro",
        sellAction:
          "Il devrai ensuite vendre ces actions le {{sellDate}} au prix de {{sellPrice}} pour faire un gain de {{profit}} euro",
      },
    },
    fr: {
      translation: {
        title: "Évolution des prix des actions Amazon et Google en 2023",
        loading: "Chargement...",
        error: "Erreur : {{errorMessage}}",
        bestTimeToTrade: {
          buyInfo:
            "Vous devriez acheter {{amount}} actions de {{company}} le {{purchaseDate}} au prix de {{purchasePrice}} euro",
          sellInfo:
            "Ensuite, vous devriez vendre ces actions le {{sellDate}} au prix de {{sellPrice}} euro pour réaliser un bénéfice de {{profit}} euro",
        },
        bestTimeToTrade: "Meilleur moment pour trader",
        buyAction:
          "vous devriez acheter {{amount}} d'action {{company}} le {{purchaseDate}} au prix de {{purchasePrice}} euro",
        sellAction:
          "Vous devriez ensuite vendre ces actions le {{sellDate}} au prix de {{sellPrice}} pour réaliser un gain de {{profit}} euro",
      },
    },
  },
  lng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
