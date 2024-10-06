export interface IBooksData {
  count: number;
  items: IBook[];
}

export interface IBook {
  image?: string;
  id: string;
  ISBN: string;
  title: string;
  authName: string;
  quanlity: number;
  status: boolean;
  language: string;
  type: string;
}

export interface IBooksSlide {
  isLoading: boolean;
  listBooks: IBooksData;
  error: string | null;
}
