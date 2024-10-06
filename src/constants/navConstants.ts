import NavDashboardIcon from '@/components/iconSvgs/NavDashboardIcon';
import { PATHS } from './route';
import NavSettingIcon from '@/components/iconSvgs/NavSettingIcon';
import NavHomeValuationIcon from '@/components/iconSvgs/NavHomeValuationIcon';
import NavProjectResponseIcon from '@/components/iconSvgs/NavProjectResponseIcon';

export const navigation = [
  {
    name: 'Dashboard',
    href: PATHS.HOME,
    icon: NavDashboardIcon,
    role: 'user',
  },
  {
    name: 'Setting',
    href: PATHS.SETTINGS,
    icon: NavSettingIcon,
    role: 'user',
  },
  {
    name: 'Project Responses',
    href: PATHS.PROJECT_RESPONSE,
    icon: NavProjectResponseIcon,
    role: 'admin',
  },
  {
    name: 'AI Responses',
    href: PATHS.AI_RESPONSE,
    icon: NavSettingIcon,
    role: 'admin',
  },
  {
    name: 'Home Valuation',
    href: PATHS.HOME_VALUATION,
    icon: NavHomeValuationIcon,
    role: 'user',
  },
];
