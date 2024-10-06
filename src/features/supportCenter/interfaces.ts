import { Timestamp } from 'firebase/firestore';

export interface ISupportCenterSlide {
  isLoading: boolean;
  error: string | null;
  uerArticleHelpful: IUerArticleHelpful | null;
  isSendingMessage: boolean;
}

export interface ICreateRequest {
  title: string;
  content: string;
  article_id: number | null | string;
}

export interface IUserHelpfulVote {
  id: number;
  isHelpful: boolean;
  article: number;
  user: number;
}

export interface IUerArticleHelpful {
  userHelpfulVote?: IUserHelpfulVote[];
  totalVotes: number;
  helpfulVotes: number;
}

export interface IArticleHelpfulRequest {
  isHelpful?: boolean;
  articleId: number;
}

export interface ISupportContactFormRequest {
  title?: string;
  email: string;
  phoneNumber: string;
  name: string;
  message: string;
  typeFeedback?: string;
  type?: string;
}

export interface ISendMessageChatBoxRequest {
  email: string;
  message: string;
}

export interface ICreateConversationChatBoxResponse {
  message: string;
  isError?: boolean;
}

export enum MessageType {
  email = 'email',
  sms = 'sms',
  chat = 'chat',
  time = 'time',
  call = 'call',
}

export type IMessageChatBox = {
  id: string;
  message: string;
  fullName: string;
  ownerId: string;
  conversationId: string;
  createdAt: Timestamp;
  type: string;
  groupMessageType?: string;
  groupDate?: string;
  fromContact?: boolean;
  subject?: string;
};
