export interface IUserInfo {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}
export interface ISeat {
  id: string;
  userInfo?: IUserInfo;
  assignedDate?: string;
}

export interface ISeatSlide {
  isLoading: boolean;
  seats: ISeat[] | [];
  error: string | null;
  pageSize: number;
  totalCount: number;
}

export interface ICreateSeatRequest {
  user_id: string | number;
}

export interface IGetSeatRequest {
  page: number;
}
