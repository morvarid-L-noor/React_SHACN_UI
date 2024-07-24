import {
  AssetOverviewIcon,
  FAQIcon,
  KYCAppIcon,
  KnowledgeCenterIcon,
  OpportunitiesIcon,
  SettingsIcon,
  TransactionsIcon
} from '@/assets/svg';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { privatePaths } from '@/routes/client-paths';
import { NavLink } from 'react-router-dom';

type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

const getClassName = ({ isActive, isPending, isTransitioning }: NavLinkRenderProps) =>
  [
    'flex cursor-pointer items-center gap-2 rounded-md px-7 py-4 transition-colors duration-300 hover:text-primary',
    isPending ? '' : '',
    isActive ? 'bg-primary/20 text-primary' : 'hover:bg-muted',
    isTransitioning ? '' : ''
  ].join(' ');
const topSideMenuItems = [
  {
    title: 'Opportunities',
    icon: <OpportunitiesIcon className="max-h-7 max-w-7" />,
    path: privatePaths.home
  }
];
const middleSideMenuItems = [
  {
    title: 'Asset Overview',
    icon: <AssetOverviewIcon className="max-h-7 max-w-7" />,
    path: privatePaths.assetOverview
  },
  {
    title: 'KYC Applications',
    icon: <KYCAppIcon className="max-h-7 max-w-7" />,
    path: privatePaths.kycApplication
  },
  {
    title: 'Transactions',
    icon: <TransactionsIcon className="max-h-7 max-w-7" />,
    path: privatePaths.transactions
  },
  {
    title: 'Settings',
    icon: <SettingsIcon className="max-h-7 max-w-7" />,
    path: privatePaths.settings
  }
];

export const bottomSideMenuItems = [
  {
    title: 'Knowledge Center',
    icon: <KnowledgeCenterIcon className="max-h-7 max-w-7" />,
    path: '/knowledge-center'
  },
  {
    title: "FAQ's",
    icon: <FAQIcon className="max-h-7 max-w-7" />,
    path: '/faq'
  }
];

export const TopNavLinks = () => {
  return topSideMenuItems.map((item) => (
    <NavLink to={item.path} key={item.title} className={(prop) => getClassName(prop)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <i className="text-primary">{item.icon}</i>
        </TooltipTrigger>
        <TooltipContent className="hidden sm:max-md:block" side="right" sideOffset={5}>
          {item.title}
        </TooltipContent>
      </Tooltip>
      <span className="hidden md:inline">{item.title}</span>
    </NavLink>
  ));
};

export const MiddleNavLinks = () => {
  return middleSideMenuItems.map((item) => (
    <NavLink to={item.path} key={item.title} className={(prop) => getClassName(prop)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <i className="text-primary">{item.icon}</i>
        </TooltipTrigger>
        <TooltipContent className="hidden sm:max-md:block" side="right" sideOffset={5}>
          {item.title}
        </TooltipContent>
      </Tooltip>
      <span className="hidden md:inline">{item.title}</span>
    </NavLink>
  ));
};
export const BottomNavLinks = () => {
  return bottomSideMenuItems.map((item) => (
    <NavLink to={item.path} key={item.title} className={(prop) => getClassName(prop)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <i className="text-primary">{item.icon}</i>
        </TooltipTrigger>
        <TooltipContent className="hidden sm:max-md:block" side="right" sideOffset={5}>
          {item.title}
        </TooltipContent>
      </Tooltip>
      <span className="hidden md:inline">{item.title}</span>
    </NavLink>
  ));
};

export const MobileMenuItems = ({ onLinksClick }: { onLinksClick: () => void }) => {
  return [...middleSideMenuItems, ...bottomSideMenuItems].map((item) => (
    <NavLink to={item.path} key={item.title} className={(prop) => getClassName(prop)} onClick={onLinksClick}>
      <i className="text-primary">{item.icon}</i>
      <span className="text-sm">{item.title}</span>
    </NavLink>
  ));
};
