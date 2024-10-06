export interface ICreateReferral {
  name: string;
  phone: string;
  email: string;
  refId?: string;
}

export interface IReferralSlide {
  isLoading: boolean;
  error: string | null;
}
