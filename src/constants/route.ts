export const PATHS = Object.freeze({
  HOME: '/',
  BOOKS: '/books',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  SETTINGS: '/settings',
  CHAT: '/chat',
  RESET_PASSWORD: '/reset-password',
  FREE_TRIAL: '/free-trial',
  PROJECT_RESPONSE: '/project-response',
  AI_RESPONSE: '/ai-response',
  REFERRAL_SYSTEM: '/reffer',
  CHECKOUT: '/checkout',
  SUPPORT_CENTER: '/support-center',
  PROMOTED_ARTICLES: '/support-center/promoted-articles',
  HOME_VALUATION: '/home-valuation',
});

type TitleType = {
  [key: string]: string;
};

export const TITLE_PATHS: TitleType = Object.freeze({
  [PATHS.HOME]: 'Dashboard',
  [PATHS.BOOKS]: 'Books',
  [PATHS.SIGN_UP]: 'Sign up',
  [PATHS.SIGN_IN]: 'Sign in',
  [PATHS.SETTINGS]: 'Settings',
  [PATHS.CHAT]: 'Chat',
  [PATHS.RESET_PASSWORD]: 'Reset password',
  [PATHS.FREE_TRIAL]: 'payment',
  [PATHS.PROJECT_RESPONSE]: 'Project response',
  [PATHS.AI_RESPONSE]: 'AI response',
  [PATHS.REFERRAL_SYSTEM]: 'Referral system',
  [PATHS.CHECKOUT]: 'Checkout',
  [PATHS.SUPPORT_CENTER]: 'Support center',
  [PATHS.PROMOTED_ARTICLES]: 'Promoted articles',
  [PATHS.HOME_VALUATION]: 'Home Valuation',
});
