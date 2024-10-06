export interface IPaymentData {
  options: IPayment[];
}

export interface IPayment {
  id: string;
  paymentDate: string;
  amount: string;
  currency: string;
  status: string;
  paymentMethod: IPaymentMethod;
}

export interface IPaymentMethod {
  type: string;
  last4: string;
  brand: string;
  expMonth: string;
  expYear: string;
}

export interface TransactionsHistoryItem {
  id: string;
  description: string;
  invoice: string;
  status: string;
  created: number;
  amount: number;
}

export interface IPaymentSlice {
  isLoading: boolean;
  paymentsData: IPaymentData | null;
  listPayments: IPayment[] | null;
  error: string | null;
  transactionsHistory: TransactionsHistoryItem[] | null;
}

export interface TOrderHistory {
  id: number;
  createdAt: Date;
  paymentMethod: string;
  expireDate: string;
  amountPaid: number | null;
  status: string;
}

export interface TPromotedArticles {
  id: number;
  title: string;
  description?: string;
}

export interface TRecentActivity {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
}
