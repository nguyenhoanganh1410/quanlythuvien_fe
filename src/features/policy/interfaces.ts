export interface Address {
  id: string;
  street1: string;
  street2: string;
  street3: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  full: string;
}

export interface Coverage {
  key: string;
  amount: number;
  unlimited: boolean;
  timeCap: string;
}

export interface Deductible {
  key: string;
  amount: number;
  percentage: number;
  value: string;
}

export interface Endorsement {
  key: string;
  description: string;
}

export type HomeValue = {
  id: string;
  portalId: string;
  key: string;
  address: string;
  price: string;
  user: number;
  zestimateRange: string;
  policyCapture: string;
};

export interface IPolicy {
  id: string;
  portalId?: string;
  date: Date;
  storageUrl?: string;
  firstName?: string;
  lastName?: string;
  provider?: string;
  policyNumber?: string;
  claimNumber?: string;
  premium?: number;
  address?: Address;
  coverages?: Coverage[];
  deductibles?: Deductible[];
  endorsements?: Endorsement[];
  isOpenCase: boolean;
  status: string;
  progress: number;
  fileUrlS3?: string;
  homeValues?: HomeValue[];
}

export interface ITraining {
  id: string;
  policyId: string;
  userId: string;
  status: string;
  progress: number;
  type: string;
  createdTime: Date;
}

export interface IUpdatePolicyRequest {
  id: string;
  isOpenCase?: boolean;
  status?: string;
  firstName?: string;
  provider?: string;
  policyNumber?: string;
  claimNumber?: string;
  address?: {
    full: string;
  };
}

export interface IUpdatePolicyFormRequest {
  firstName?: string;
  provider?: string;
  fullAddress?: string;
  policyNumber?: string;
  claimNumber?: string;
}

export interface IDeletePolicyRequest {
  id: string;
}

export interface IPolicyDataSaveRequest {
  storageKey: string;
}

export interface IPoliciesData {
  page: number;
  pageSize: number;
  totalCount: number;
  options: IPolicy[];
}

export interface ISearchPoliciesRequest {
  search?: string;
  userId?: number | null;
  filter?: string;
  page?: number;
}

export enum StatusUploadPolicyFile {
  UPLOADING = 'UPLOADING',
  SAVING = 'SAVING',
}

export interface IFilterPolicyOption {
  id: string;
  icons: string;
  text: string;
  isSelected?: boolean;
}

export enum EFilterType {
  all = 'all',
  openCase = 'open_cases',
  closedCase = 'closed_cases',
  training = 'training',
  clarified = 'clarified',
}

export interface IPolicySlide {
  isLoading: boolean;
  isLoadingCurrentPolicy: boolean;
  isUploadingFile: boolean;
  isUploadFileSuccess: boolean;
  currentPolicy: IPolicy | null;
  currentFilePolicyUrl: string | null;
  policiesData: IPoliciesData | null;
  listPolicies: IPolicy[];
  error: string | null;
  uploadFileStatus: string | null;
  searchPolicy: string;
  filterPolicy: string;
  isShowPopupInCorrectPdf: boolean;
  fromData: FormData;
  isUpdatingPolicy: boolean;
}

export interface IDocument {
  id: string;
  policyHolder: string;
  carrier: string;
  uploadedDate: Date;
}
