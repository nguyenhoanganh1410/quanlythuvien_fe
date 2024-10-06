import { Timestamp } from 'firebase/firestore';
import { IUser } from '../user/interfaces';

export interface IChatsData {
  page: number;
  pageSize: number;
  totalCount: number;
  options: IChatSession[];
}

export interface ICreateChatSessionRequest {
  policyCapture: string;
}

export interface ICheckingChatSessionRequest {
  runId: string;
  threadId: string;
  chatSessionId: string;
}

export interface IChatSession {
  id: string;
  createdAt: Date;
  openaiThreadId: string;
  user: number;
  policyCapture: string;
  sharedUsers: string[];
  runId: string;
}

export interface IQuestionChatResponse {
  runId: string;
}

export enum MessageRoles {
  user = 'user',
  assistant = 'assistant',
}

export enum FeedbackStatus {
  thumbUp = 'thumbUp',
  thumbDown = 'thumbDown',
}

export enum EMessageStatus {
  new = 'new',
  pending = 'pending',
  deleted = 'deleted',
}

export interface IMessageData {
  page: number;
  pageSize: number;
  totalCount: number;
  options: IMessage[];
}

export interface IMessage {
  metadata: {
    userId: number;
    email: string;
  };
  role: string;
  id: string;
  value: string;
  status: string;
  pageNumber?: number;
  annotations: string[];
  thumbUpUsers?: number[];
  thumbDownUsers?: number[];
  feedbacks?: {
    id: string;
    userId: number;
    feedback: string;
    createAt: string;
  }[];
}

export interface IMessageUserData {
  page: number;
  pageSize: number;
  totalCount: number;
  options: IMessageUser[];
}

export interface IMessageUser {
  metadata: {
    userId: number;
    email: string;
  };
  role: string;
  id: string;
  value: string;
  status: string;
  time: string;
  annotations: string[];
  usage: {
    totalTokens: number;
  };
}

export interface IFeedBackMessage {
  id: string;
  thumbUpUsers?: number[];
  thumbDownUsers?: number[];
  feedbacks?: {
    id: string;
    userId: number;
    feedback: string;
    createAt: string;
  }[];
}

export interface IQuestionChatRequest {
  chatSessionId: string;
  threadId: string;
  input: string;
}

export interface ISearchFeedbacksRequest {
  search?: string;
  filter?: string;
  page?: number;
  pageSize?: number;
}

export interface IFeedbacksData {
  page: number;
  pageSize: number;
  totalCount: number;
  options: IFeedback[];
}

export interface IFeedback {
  id?: string;
  feedback?: string;
  message?: string;
  createdAt?: string;
  isThumbUp?: boolean;
  userInfo?: IUser;
}

export interface IAIResponseData {
  page: number;
  pageSize: number;
  totalCount: number;
  options: IAIResponse[];
}

export interface IAIResponse {
  questions: {
    value: string;
    metadata: {
      userId: number;
      email: string;
    };
    time: string;
    annotations: string[];
    usage: {
      totalTokens: number;
    };
  };
  role: string;
  id: string;
  value: string;
  status: string;
  time: string;
  annotations: string[];
}

export interface IChatSlice {
  isLoading: boolean;
  isTyping: boolean;
  pingStatus: string;
  chatsData: IChatsData | null;
  currentChatSession: IChatSession | null;
  listMessages: IMessage[];
  messagesData: IMessageData | null;
  newQuestionChat: IQuestionChatResponse | null;
  error: string | null;
  isScrollToPage: boolean;
  listFeedbacks: IFeedback[];
  feedbacksData: IFeedbacksData | null;
  listAIResponse: IAIResponse[];
  aiResponseData: IAIResponseData | null;
}

export interface IEmailDocument {
  id: string;
  senderName: string;
  recipients: string[];
  subject?: string;
  content: string;
  listFiles?: string[];
  isRead: boolean;
  isFavorite: boolean;
  updatedAt: Timestamp;
  policyId: string;
}

export interface IEmailDocumentFormRequest {
  recipients: string[];
  cc?: string[];
  bcc?: string[];
  content: string;
  subject?: string;
  policyId: string;
  updatedAt: Timestamp;
}

export interface IMessageEmailDocument {
  id: string;
  emailId: string;
  senderName: string;
  subject?: string;
  content: string;
  listFiles?: string[];
  updatedAt: Timestamp;
}
