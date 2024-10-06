import { CardNumberElementComponent } from '@stripe/react-stripe-js';
import { Stripe, StripeElements } from '@stripe/stripe-js';

export interface ICompanyAddress {
  companyName: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
  state?: string;
}

export interface IPaymentDetail {
  promoCode: string;
  nameOnCard: string;
  billingAddress: string;
  cardNumber?: string;
  expireDate?: string;
  securityCode?: string;
}

export interface ICheckoutRequest {
  seats: number;
  promoCode?: string;
  isPayAsYouGo?: boolean;
}

export interface ICheckPromoCodeRequest {
  promoCode?: string;
}

export interface ISeats {
  seats: number;
  price: number;
  priceDiscount: number;
}

export interface IElementStripe {
  stripe?: Stripe;
  stripeEmplements?: StripeElements;
  cardElements?: CardNumberElementComponent;
}
