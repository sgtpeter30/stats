export interface StatsModel {
  date: string;
  halvesQuantity: number;
  halves: [];
  pizzaArray: [
    {
      pizzaName: string;
      pizzaQuantity: number;
    }
  ];
  kitsArray: [
    {
      kitName: string;
      kitQuantity: number;
    }
  ];
  pizzaSum: number;
  kitSum: number;
}
