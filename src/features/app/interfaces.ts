export enum EAlertType {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
}

export interface IAppState {
  message: string | null;
  type: EAlertType;
  loading: boolean;
  loadingProgress: number;
  isShowUnlock: boolean;
}
