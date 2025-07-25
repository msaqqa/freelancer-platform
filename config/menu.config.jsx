import {
  AlertCircle,
  Award,
  Badge,
  Bell,
  Bitcoin,
  Book,
  Briefcase,
  Building,
  CalendarCheck,
  Captions,
  CheckCircle,
  Code,
  Coffee,
  File as DocumentIcon,
  Euro,
  Eye,
  File,
  FileQuestion,
  FileText,
  Flag,
  Ghost,
  Gift,
  Grid,
  Heart,
  HelpCircle,
  Kanban,
  Key,
  Layout,
  LayoutGrid,
  LifeBuoy,
  MessageSquare,
  Monitor,
  Network,
  Users as PeopleIcon,
  Plug,
  Settings,
  Share2,
  Shield,
  ShieldUser,
  ShoppingCart,
  SquareMousePointer,
  Star,
  TrendingUp,
  UserCheck,
  UserCircle,
  Users,
  Briefcase as WorkIcon,
  Zap,
} from 'lucide-react';

export const MENU_SIDEBAR_CUSTOM = [
  {
    title: 'Store - Client',
    icon: Users,
    children: [
      { title: 'Home', path: '/store-client/home' },
      {
        title: 'Search Results',
        children: [
          {
            title: 'Search Results - Grid',
            path: '/store-client/search-results-grid',
          },
          {
            title: 'Search Results - List',
            path: '/store-client/search-results-list',
          },
        ],
      },
      {
        title: 'Overlays',
        children: [
          { title: 'Product Details', path: '/store-client/product-details' },
          { title: 'Wishlist', path: '/store-client/wishlist' },
        ],
      },
      {
        title: 'Checkout',
        children: [
          {
            title: 'Order Summary',
            path: '/store-client/checkout/order-summary',
          },
          {
            title: 'Shipping Info',
            path: '/store-client/checkout/shipping-info',
          },
          {
            title: 'Payment Method',
            path: '/store-client/checkout/payment-method',
          },
          {
            title: 'Order Placed',
            path: '/store-client/checkout/order-placed',
          },
        ],
      },
      { title: 'My Orders', path: '/store-client/my-orders' },
      { title: 'Order Receipt', path: '/store-client/order-receipt' },
    ],
  },
];

export const MENU_SIDEBAR_COMPACT = [
  {
    title: 'Dashboards',
    icon: LayoutGrid,
    path: '/',
  },
  {
    title: 'Public Profile',
    icon: UserCircle,
    children: [
      {
        title: 'Profiles',
        children: [
          { title: 'Default', path: '/public-profile/profile' },
          { title: 'Creator', path: '/public-profile/profiles/creator' },
          { title: 'Company', path: '/public-profile/profiles/company' },
          { title: 'NFT', path: '/public-profile/profiles/nft' },
          { title: 'Blogger', path: '/public-profile/profiles/blogger' },
          { title: 'CRM', path: '/public-profile/profiles/crm' },
          {
            title: 'More',
            collapse: true,
            collapseTitle: 'Show less',
            expandTitle: 'Show 4 more',
            children: [
              { title: 'Gamer', path: '/public-profile/profiles/gamer' },
              { title: 'Feeds', path: '/public-profile/profiles/feeds' },
              { title: 'Plain', path: '/public-profile/profiles/plain' },
              { title: 'Modal', path: '/public-profile/profiles/modal' },
            ],
          },
        ],
      },
      {
        title: 'Projects',
        children: [
          { title: '3 Columns', path: '/public-profile/projects/3-columns' },
          { title: '2 Columns', path: '/public-profile/projects/2-columns' },
        ],
      },
      { title: 'Works', path: '/public-profile/works' },
      { title: 'Teams', path: '/public-profile/teams' },
      { title: 'Network', path: '/public-profile/network' },
      { title: 'Activity', path: '/public-profile/activity' },
      {
        title: 'More',
        collapse: true,
        collapseTitle: 'Show less',
        expandTitle: 'Show 3 more',
        children: [
          { title: 'Campaigns - Card', path: '/public-profile/campaigns/card' },
          { title: 'Campaigns - List', path: '/public-profile/campaigns/list' },
          { title: 'Empty', path: '/public-profile/empty' },
        ],
      },
    ],
  },
  {
    title: 'My Account',
    icon: Settings,
    children: [
      {
        title: 'Account',
        children: [
          { title: 'Get Started', path: '/account/home/get-started' },
          { title: 'User Profile', path: '/account/home/user-profile' },
          { title: 'Company Profile', path: '/account/home/company-profile' },
          {
            title: 'Settings - With Sidebar',
            path: '/account/home/settings-sidebar',
          },
          {
            title: 'Settings - Enterprise',
            path: '/account/home/settings-enterprise',
          },
          { title: 'Settings - Plain', path: '/account/home/settings-plain' },
          { title: 'Settings - Modal', path: '/account/home/settings-modal' },
        ],
      },
      {
        title: 'Billing',
        children: [
          { title: 'Billing - Basic', path: '/account/billing/basic' },
          {
            title: 'Billing - Enterprise',
            path: '/account/billing/enterprise',
          },
          { title: 'Plans', path: '/account/billing/plans' },
          { title: 'Billing History', path: '/account/billing/history' },
        ],
      },
      {
        title: 'Security',
        children: [
          { title: 'Get Started', path: '/account/security/get-started' },
          { title: 'Security Overview', path: '/account/security/overview' },
          {
            title: 'Allowed IP Addresses',
            path: '/account/security/allowed-ip-addresses',
          },
          {
            title: 'Privacy Settings',
            path: '/account/security/privacy-settings',
          },
          {
            title: 'Device Management',
            path: '/account/security/device-management',
          },
          {
            title: 'Backup & Recovery',
            path: '/account/security/backup-and-recovery',
          },
          {
            title: 'Current Sessions',
            path: '/account/security/current-sessions',
          },
          { title: 'Security Log', path: '/account/security/security-log' },
        ],
      },
      {
        title: 'Members & Roles',
        children: [
          { title: 'Teams Starter', path: '/account/members/team-starter' },
          { title: 'Teams', path: '/account/members/teams' },
          { title: 'Team Info', path: '/account/members/team-info' },
          {
            title: 'Members Starter',
            path: '/account/members/members-starter',
          },
          { title: 'Team Members', path: '/account/members/team-members' },
          { title: 'Import Members', path: '/account/members/import-members' },
          { title: 'Roles', path: '/account/members/roles' },
          {
            title: 'Permissions - Toggler',
            path: '/account/members/permissions-toggle',
          },
          {
            title: 'Permissions - Check',
            path: '/account/members/permissions-check',
          },
        ],
      },
      { title: 'Integrations', path: '/account/integrations' },
      { title: 'Notifications', path: '/account/notifications' },
      { title: 'API Keys', path: '/account/api-keys' },
      {
        title: 'More',
        collapse: true,
        collapseTitle: 'Show less',
        expandTitle: 'Show 3 more',
        children: [
          { title: 'Appearance', path: '/account/appearance' },
          { title: 'Invite a Friend', path: '/account/invite-a-friend' },
          { title: 'Activity', path: '/account/activity' },
        ],
      },
    ],
  },
  {
    title: 'Network',
    icon: Users,
    children: [
      { title: 'Get Started', path: '/network/get-started' },
      {
        title: 'User Cards',
        children: [
          { title: 'Mini Cards', path: '/network/user-cards/mini-cards' },
          { title: 'Team Crew', path: '/network/user-cards/team-crew' },
          { title: 'Author', path: '/network/user-cards/author' },
          { title: 'NFT', path: '/network/user-cards/nft' },
          { title: 'Social', path: '/network/user-cards/social' },
        ],
      },
      {
        title: 'User Table',
        children: [
          { title: 'Team Crew', path: '/network/user-table/team-crew' },
          { title: 'App Roster', path: '/network/user-table/app-roster' },
          {
            title: 'Market Authors',
            path: '/network/user-table/market-authors',
          },
          { title: 'SaaS Users', path: '/network/user-table/saas-users' },
          { title: 'Store Clients', path: '/network/user-table/store-clients' },
          { title: 'Visitors', path: '/network/user-table/visitors' },
        ],
      },
      { title: 'Cooperations', path: '/network/cooperations', disabled: true },
      { title: 'Leads', path: '/network/leads', disabled: true },
      { title: 'Donators', path: '/network/donators', disabled: true },
    ],
  },
  {
    title: 'Store - Client',
    icon: ShoppingCart,
    children: [
      { title: 'Home', path: '/store-client/home' },
      {
        title: 'Search Results - Grid',
        path: '/store-client/search-results-grid',
      },
      {
        title: 'Search Results - List',
        path: '/store-client/search-results-list',
      },
      { title: 'Product Details', path: '/store-client/product-details' },
      { title: 'Wishlist', path: '/store-client/wishlist' },
      {
        title: 'Checkout',
        children: [
          {
            title: 'Order Summary',
            path: '/store-client/checkout/order-summary',
          },
          {
            title: 'Shipping Info',
            path: '/store-client/checkout/shipping-info',
          },
          {
            title: 'Payment Method',
            path: '/store-client/checkout/payment-method',
          },
          {
            title: 'Order Placed',
            path: '/store-client/checkout/order-placed',
          },
        ],
      },
      { title: 'My Orders', path: '/store-client/my-orders' },
      { title: 'Order Receipt', path: '/store-client/order-receipt' },
    ],
  },
  {
    title: 'User Management',
    icon: ShieldUser,
    children: [
      {
        title: 'Users',
        path: '/user-management/users',
      },
      {
        title: 'Roles',
        path: '/user-management/roles',
      },
      {
        title: 'Permissions',
        path: '/user-management/permissions',
      },
      {
        title: 'Account',
        path: '/user-management/account',
      },
      {
        title: 'Logs',
        path: '/user-management/logs',
      },
      {
        title: 'Settings',
        path: '/user-management/settings',
      },
    ],
  },
  {
    title: 'Authentication',
    icon: Shield,
    children: [
      {
        title: 'Sign In',
        path: '/signin',
      },
      {
        title: 'Check Email',
        path: '/signup',
      },
      {
        title: 'Reset Password',
        path: '/reset-password',
      },
      {
        title: '2FA',
        path: '/2fa',
      },
      { title: 'Welcome Message', path: '/auth/welcome-message' },
      { title: 'Account Deactivated', path: '/auth/account-deactivated' },
      { title: 'Error 404', path: '/error/404' },
      { title: 'Error 500', path: '/error/500' },
    ],
  },
];

export const MENU_HELP = [
  {
    title: 'Getting Started',
    icon: Coffee,
    path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/installation',
  },
  {
    title: 'Support Forum',
    icon: AlertCircle,
    children: [
      {
        title: 'All Questions',
        icon: FileQuestion,
        path: 'https://devs.keenthemes.com',
      },
      {
        title: 'Popular Questions',
        icon: Star,
        path: 'https://devs.keenthemes.com/popular',
      },
      {
        title: 'Ask Question',
        icon: HelpCircle,
        path: 'https://devs.keenthemes.com/question/create',
      },
    ],
  },
  {
    title: 'Licenses & FAQ',
    icon: Captions,
    path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/license',
  },
  {
    title: 'Documentation',
    icon: FileQuestion,
    path: 'https://keenthemes.com/metronic/tailwind/docs',
  },
  { separator: true },
  { title: 'Contact Us', icon: Share2, path: 'https://keenthemes.com/contact' },
];

export const MENU_ROOT = [
  {
    title: 'Public Profile',
    icon: UserCircle,
    rootPath: '/public-profile/',
    path: '/public-profile/profile',
    childrenIndex: 2,
  },
  {
    title: 'Account',
    icon: Settings,
    rootPath: '/account/',
    path: '/',
    childrenIndex: 3,
  },
  {
    title: 'Network',
    icon: Users,
    rootPath: '/network/',
    path: '/network/get-started',
    childrenIndex: 4,
  },
  {
    title: 'Authentication',
    icon: Shield,
    rootPath: '/authentication/',
    path: '/authentication/get-started',
    childrenIndex: 5,
  },
  {
    title: 'Store - Client',
    icon: ShoppingCart,
    rootPath: '/store-client/',
    path: '/store-client/home',
    childrenIndex: 6,
  },
  {
    title: 'User Management',
    icon: ShieldUser,
    rootPath: '/user-management/',
    path: '/user-management/users',
    childrenIndex: 7,
  },
];
