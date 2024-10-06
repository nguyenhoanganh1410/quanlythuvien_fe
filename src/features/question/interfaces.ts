export interface IPresetQuestionData {
  page: number;
  pageSize: number;
  totalCount: number;
  options: IPresetQuestion[];
}
export interface IPresetQuestion {
  id: string;
  description: string;
}

export interface ICreateQuestionRequest {
  description: string;
}

export interface IEditQuestionRequest {
  id: string;
  description: string;
}

export interface IPolicySlide {
  isLoading: boolean;
  questionsData: IPresetQuestionData | null;
  listQuestions: IPresetQuestion[] | null;
  error: string | null;
}
