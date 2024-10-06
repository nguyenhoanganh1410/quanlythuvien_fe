export interface IRequestGetHomeValue {
  address: string;
}

export interface IResponseGetHomeValue {
  price: number;
}

export interface IHomeValuationSlide {
  isSearching: boolean;
  error: string;
  homeValuationData: {
    price: number;
  } | null;
}
