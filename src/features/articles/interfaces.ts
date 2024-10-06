export interface IArticlesData {
  page: number;
  pageSize: number;
  totalCount: number;
  options: IArticle[];
}

export interface IArticleUser {
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  userName: string;
}
export interface IArticle {
  id: number;
  type: string;
  title: string;
  content: string;
  author: number;
  createdAt: Date;
  userInfo?: IArticleUser;
  feedbacksCount?: number;
}

export interface ISearchArticlesRequest {
  search?: string;
  filter?: string;
  page?: number;
  pageSize?: number;
}

export interface IArticlesSlide {
  isLoading: boolean;
  isSearching: boolean;
  isTyping: boolean;
  listArticles: IArticle[];
  articlesData: IArticlesData | null;
  error: string | null;
}
