export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  avatar?: string;
  inboundEmail?: string;
  isStaff?: boolean;
  isDoneWalkthrough?: boolean;
  isFirstLogin?: boolean;
  stripeCustomerId?: string;
  paymentMethodId?: string;
  refId?: string;
  payAsYouGoMode?: boolean;
  subscriptionEndDate?: Date;
}

export interface IUserOptionsData {
  page: number;
  pageSize: number;
  totalCount: number;
  options: IUserOptions[];
}

export interface IUserOptions {
  id: number;
  username: string;
  fullName: string;
}

export interface IRequestSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRequestSignIn {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IResetPasswordFormValues {
  email: string;
}

export interface IRequestRefreshToken {
  refresh: string;
}

export interface IRequestLogout {
  refresh: string;
}

export interface IRequestUpdateUser {
  firstName?: string;
  lastName?: string;
  isDoneWalkthrough?: boolean;
  isFirstLogin?: boolean;
  paymentMethodId?: string;
  specialize?: string;
  payAsYouGoMode?: boolean;
}

export interface IRequestForgotPassword {
  email: string;
}

export interface IRequestResetPassword {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface IRequestVerifyTokenResetPassword {
  token: string;
}

export enum EUpdateProfileType {
  name = 'name',
  email = 'email',
  password = 'password',
  payAsYouGoMode = 'payAsYouGoMode',
}

export interface IRequestPaymentForm {
  promoCode?: string;
  isPayAsYouGo?: boolean;
}

export interface ISearchUserOptions {
  search?: string;
  page?: number;
}

export interface IUsageCost {
  id: number;
  user: number;
  used: number;
  limit: number;
  expires_at: string;
  status: string;
}

export interface IUserState {
  isLoading: boolean;
  user: IUser | null;
  userOptionsData: IUserOptionsData | null;
  listUserOptions: IUserOptions[];
  isAuthentication: boolean;
  error: string | null;
  statusVerifyTokenPassword: string;
  isShowPopupExistEmail: boolean;
  paymentStatus: {
    normalUsageCost: IUsageCost;
    payAsYouGoCost: number;
  } | null;
}
