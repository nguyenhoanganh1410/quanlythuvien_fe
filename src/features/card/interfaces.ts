export interface ICardData {
  options: ICard[];
}

export interface ICard {
  customerId: string;
  cardId: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: string;
  name: string;
}

export interface ICustomer {
  customerId: string;
}

export interface IPolicySlide {
  isLoading: boolean;
  cardsData: ICardData | null;
  listCards: ICard[] | null;
  customer: ICustomer | null;
  error: string | null;
}
