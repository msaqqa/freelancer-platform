import {
  Award,
  Badge,
  Bell,
  Bitcoin,
  Book,
  Briefcase,
  Building,
  CalendarCheck,
  CheckCircle,
  Code,
  Coffee,
  File as DocumentIcon,
  Euro,
  Eye,
  File,
  FileText,
  Flag,
  Ghost,
  Gift,
  Grid,
  Heart,
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
  ShieldUser,
  SquareMousePointer,
  TrendingUp,
  UserCheck,
  UserCircle,
  Users,
  Briefcase as WorkIcon,
  Zap,
} from 'lucide-react';

export const CLIENT_MENU_SIDEBAR = [
  {
    title: 'Dashboards',
    icon: LayoutGrid,
    children: [
      { title: 'Light Sidebar', path: '/client' },
      { title: 'Dark Sidebar', path: '/client/dark-sidebar' },
    ],
  },
  { heading: 'Client' },
  {
    title: 'Profile',
    icon: UserCircle,
    children: [
      {
        title: 'Profile',
        path: '/client/public-profile/profiles/default',
      },
      {
        title: 'Projects',
        path: '/client/public-profile/projects/3-columns',
      },
      { title: 'Works', path: '/client/public-profile/works' },
      { title: 'Teams', path: '/client/public-profile/teams' },
      { title: 'Activity', path: '/client/public-profile/activity' },
    ],
  },
  {
    title: 'My Account',
    icon: Settings,
    children: [
      {
        title: 'Account',
        children: [
          { title: 'Get Started', path: '/client/account/home/get-started' },
          { title: 'User Profile', path: '/client/account/home/user-profile' },
          {
            title: 'Company Profile',
            path: '/client/account/home/company-profile',
          },
          {
            title: 'Settings - With Sidebar',
            path: '/client/account/home/settings-sidebar',
          },
          {
            title: 'Settings - Enterprise',
            path: '/client/account/home/settings-enterprise',
          },
          {
            title: 'Settings - Plain',
            path: '/client/account/home/settings-plain',
          },
          {
            title: 'Settings - Modal',
            path: '/client/account/home/settings-modal',
          },
        ],
      },
      {
        title: 'Billing',
        children: [
          { title: 'Billing - Basic', path: '/client/account/billing/basic' },
          {
            title: 'Billing - Enterprise',
            path: '/client/account/billing/enterprise',
          },
          { title: 'Plans', path: '/client/account/billing/plans' },
          { title: 'Billing History', path: '/client/account/billing/history' },
        ],
      },
      {
        title: 'Security',
        children: [
          {
            title: 'Get Started',
            path: '/client/account/security/get-started',
          },
          {
            title: 'Security Overview',
            path: '/client/account/security/overview',
          },
          {
            title: 'Allowed IP Addresses',
            path: '/client/account/security/allowed-ip-addresses',
          },
          {
            title: 'Privacy Settings',
            path: '/client/account/security/privacy-settings',
          },
          {
            title: 'Device Management',
            path: '/client/account/security/device-management',
          },
          {
            title: 'Backup & Recovery',
            path: '/client/account/security/backup-and-recovery',
          },
          {
            title: 'Current Sessions',
            path: '/client/account/security/current-sessions',
          },
          {
            title: 'Security Log',
            path: '/client/account/security/security-log',
          },
        ],
      },
      {
        title: 'Members & Roles',
        children: [
          {
            title: 'Teams Starter',
            path: '/client/account/members/team-starter',
          },
          { title: 'Teams', path: '/client/account/members/teams' },
          { title: 'Team Info', path: '/client/account/members/team-info' },
          {
            title: 'Members Starter',
            path: '/client/account/members/members-starter',
          },
          {
            title: 'Team Members',
            path: '/client/account/members/team-members',
          },
          {
            title: 'Import Members',
            path: '/client/account/members/import-members',
          },
          { title: 'Roles', path: '/client/account/members/roles' },
          {
            title: 'Permissions - Toggler',
            path: '/client/account/members/permissions-toggle',
          },
          {
            title: 'Permissions - Check',
            path: '/client/account/members/permissions-check',
          },
        ],
      },
      { title: 'Integrations', path: '/client/account/integrations' },
      { title: 'Notifications', path: '/client/account/notifications' },
      { title: 'API Keys', path: '/client/account/api-keys' },
      {
        title: 'More',
        collapse: true,
        collapseTitle: 'Show less',
        expandTitle: 'Show 3 more',
        children: [
          { title: 'Appearance', path: '/client/account/appearance' },
          { title: 'Invite a Friend', path: '/client/account/invite-a-friend' },
          { title: 'Activity', path: '/client/account/activity' },
        ],
      },
    ],
  },
  {
    title: 'Network',
    icon: Users,
    children: [
      { title: 'Get Started', path: '/client/network/get-started' },
      {
        title: 'User Cards',
        children: [
          {
            title: 'Mini Cards',
            path: '/client/network/user-cards/mini-cards',
          },
          { title: 'Team Crew', path: '/client/network/user-cards/team-crew' },
          { title: 'Author', path: '/client/network/user-cards/author' },
          { title: 'NFT', path: '/client/network/user-cards/nft' },
          { title: 'Social', path: '/client/network/user-cards/social' },
        ],
      },
      {
        title: 'User Table',
        children: [
          { title: 'Team Crew', path: '/client/network/user-table/team-crew' },
          {
            title: 'App Roster',
            path: '/client/network/user-table/app-roster',
          },
          {
            title: 'Market Authors',
            path: '/client/network/user-table/market-authors',
          },
          {
            title: 'SaaS Users',
            path: '/client/network/user-table/saas-users',
          },
          {
            title: 'Store Clients',
            path: '/client/network/user-table/store-clients',
          },
          { title: 'Visitors', path: '/client/network/user-table/visitors' },
        ],
      },
    ],
  },
  { heading: 'Apps' },
  {
    title: 'User Management',
    icon: ShieldUser,
    children: [
      {
        title: 'Users',
        path: '/client/user-management/users',
      },
      {
        title: 'Roles',
        path: '/client/user-management/roles',
      },
      {
        title: 'Permissions',
        path: '/client/user-management/permissions',
      },
      {
        title: 'Account',
        path: '/client/user-management/account',
      },
      {
        title: 'Logs',
        path: '/client/user-management/logs',
      },
      {
        title: 'Settings',
        path: '/client/user-management/settings',
      },
    ],
  },
  {
    title: 'Store - Client',
    icon: Users,
    children: [
      { title: 'Home', path: '/client/store-client/home' },
      {
        title: 'Search Results - Grid',
        path: '/client/store-client/search-results-grid',
      },
      {
        title: 'Search Results - List',
        path: '/client/store-client/search-results-list',
      },
      {
        title: 'Product Details',
        path: '/client/store-client/product-details',
      },
      { title: 'Wishlist', path: '/client/store-client/wishlist' },
      {
        title: 'Checkout',
        children: [
          {
            title: 'Order Summary',
            path: '/client/store-client/checkout/order-summary',
          },
          {
            title: 'Shipping Info',
            path: '/client/store-client/checkout/shipping-info',
          },
          {
            title: 'Payment Method',
            path: '/client/store-client/checkout/payment-method',
          },
          {
            title: 'Order Placed',
            path: '/client/store-client/checkout/order-placed',
          },
        ],
      },
      { title: 'My Orders', path: '/client/store-client/my-orders' },
      { title: 'Order Receipt', path: '/client/store-client/order-receipt' },
    ],
  },
];

export const CLIENT_MENU_MEGA = [
  { title: 'Home', path: '/client' },
  {
    title: 'Profiles',
    children: [
      {
        title: 'Profiles',
        children: [
          {
            children: [
              {
                title: 'Projects - 3 Cols',
                icon: Layout,
                path: '/client/public-profile/projects/3-columns',
              },
              {
                title: 'Projects - 2 Cols',
                icon: Grid,
                path: '/client/public-profile/projects/2-columns',
              },
              {
                title: 'Works',
                icon: WorkIcon,
                path: '/client/public-profile/works',
              },
              {
                title: 'Teams',
                icon: PeopleIcon,
                path: '/client/public-profile/teams',
              },
              {
                title: 'Network',
                icon: Network,
                path: '/client/public-profile/network',
              },
              {
                title: 'Activity',
                icon: TrendingUp,
                path: '/client/public-profile/activity',
              },
              {
                title: 'Campaigns - Card',
                icon: LayoutGrid,
                path: '/client/public-profile/campaigns/card',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'My Account',
    children: [
      {
        title: 'General Pages',
        children: [
          {
            title: 'Integrations',
            icon: Plug,
            path: '/client/account/integrations',
          },
          {
            title: 'Notifications',
            icon: Bell,
            path: '/client/account/notifications',
          },
          { title: 'API Keys', icon: Key, path: '/client/account/api-keys' },
          {
            title: 'Appearance',
            icon: Eye,
            path: '/client/account/appearance',
          },
          {
            title: 'Invite a Friend',
            icon: UserCheck,
            path: '/client/account/invite-a-friend',
          },
          {
            title: 'Activity',
            icon: LifeBuoy,
            path: '/client/account/activity',
          },
          { title: 'Brand', icon: CheckCircle, disabled: true },
          { title: 'Get Paid', icon: Euro, disabled: true },
        ],
      },
      {
        title: 'Other pages',
        children: [
          {
            title: 'Account Home',
            children: [
              {
                title: 'Get Started',
                path: '/client/account/home/get-started',
              },
              {
                title: 'User Profile',
                path: '/client/account/home/user-profile',
              },
              {
                title: 'Company Profile',
                path: '/client/account/home/company-profile',
              },
              {
                title: 'With Sidebar',
                path: '/client/account/home/settings-sidebar',
              },
              {
                title: 'Enterprise',
                path: '/client/account/home/settings-enterprise',
              },
              { title: 'Plain', path: '/client/account/home/settings-plain' },
              { title: 'Modal', path: '/client/account/home/settings-modal' },
            ],
          },
          {
            title: 'Billing',
            children: [
              { title: 'Basic Billing', path: '/client/account/billing/basic' },
              {
                title: 'Enterprise',
                path: '/client/account/billing/enterprise',
              },
              { title: 'Plans', path: '/client/account/billing/plans' },
              {
                title: 'Billing History',
                path: '/client/account/billing/history',
              },
              { title: 'Tax Info', disabled: true },
              { title: 'Invoices', disabled: true },
              { title: 'Gateaways', disabled: true },
            ],
          },
          {
            title: 'Security',
            children: [
              {
                title: 'Get Started',
                path: '/client/account/security/get-started',
              },
              {
                title: 'Security Overview',
                path: '/client/account/security/overview',
              },
              {
                title: 'IP Addresses',
                path: '/client/account/security/allowed-ip-addresses',
              },
              {
                title: 'Privacy Settings',
                path: '/client/account/security/privacy-settings',
              },
              {
                title: 'Device Management',
                path: '/client/account/security/device-management',
              },
              {
                title: 'Backup & Recovery',
                path: '/client/account/security/backup-and-recovery',
              },
              {
                title: 'Current Sessions',
                path: '/client/account/security/current-sessions',
              },
              {
                title: 'Security Log',
                path: '/client/account/security/security-log',
              },
            ],
          },
          {
            title: 'Members & Roles',
            children: [
              {
                title: 'Teams Starter',
                path: '/client/account/members/team-starter',
              },
              { title: 'Teams', path: '/client/account/members/teams' },
              { title: 'Team Info', path: '/client/account/members/team-info' },
              {
                title: 'Members Starter',
                path: '/client/account/members/members-starter',
              },
              {
                title: 'Team Members',
                path: '/client/account/members/team-members',
              },
              {
                title: 'Import Members',
                path: '/client/account/members/import-members',
              },
              { title: 'Roles', path: '/client/account/members/roles' },
              {
                title: 'Permissions - Toggler',
                path: '/client/account/members/permissions-toggle',
              },
              {
                title: 'Permissions - Check',
                path: '/client/account/members/permissions-check',
              },
            ],
          },
          {
            title: 'Other Pages',
            children: [
              { title: 'Integrations', path: '/client/account/integrations' },
              { title: 'Notifications', path: '/client/account/notifications' },
              { title: 'API Keys', path: '/client/account/api-keys' },
              { title: 'Appearance', path: '/client/account/appearance' },
              {
                title: 'Invite a Friend',
                path: '/client/account/invite-a-friend',
              },
              { title: 'Activity', path: '/client/account/activity' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Network',
    children: [
      {
        title: 'General Pages',
        children: [
          {
            title: 'Get Started',
            icon: Flag,
            path: '/client/network/get-started',
          },
          { title: 'Colleagues', icon: Users, path: '#', disabled: true },
          { title: 'Donators', icon: Heart, path: '#', disabled: true },
          { title: 'Leads', icon: Zap, path: '#', disabled: true },
        ],
      },
      {
        title: 'Other pages',
        children: [
          {
            title: 'User Cards',
            children: [
              {
                title: 'Mini Cards',
                path: '/client/network/user-cards/mini-cards',
              },
              {
                title: 'Team Members',
                path: '/client/network/user-cards/team-crew',
              },
              { title: 'Authors', path: '/client/network/user-cards/author' },
              { title: 'NFT Users', path: '/client/network/user-cards/nft' },
              {
                title: 'Social Users',
                path: '/client/network/user-cards/social',
              },
              { title: 'Gamers', path: '#', disabled: true },
            ],
          },
          {
            title: 'User Base',
            badge: 'Datatables',
            children: [
              {
                title: 'Team Crew',
                path: '/client/network/user-table/team-crew',
              },
              {
                title: 'App Roster',
                path: '/client/network/user-table/app-roster',
              },
              {
                title: 'Market Authors',
                path: '/client/network/user-table/market-authors',
              },
              {
                title: 'SaaS Users',
                path: '/client/network/user-table/saas-users',
              },
              {
                title: 'Store Clients',
                path: '/client/network/user-table/store-clients',
              },
              {
                title: 'Visitors',
                path: '/client/network/user-table/visitors',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Apps',
    children: [
      {
        title: 'Store - Client',
        children: [
          {
            children: [
              { title: 'Home', path: '/client/store-client/home' },
              {
                title: 'Search Results - Grid',
                path: '/client/store-client/search-results-grid',
              },
              {
                title: 'Search Results - List',
                path: '/client/store-client/search-results-list',
              },
              {
                title: 'Product Details',
                path: '/client/store-client/product-details',
              },
              { title: 'Wishlist', path: '/client/store-client/wishlist' },
              { title: 'My Orders', path: '/client/store-client/my-orders' },
            ],
          },
          {
            children: [
              {
                title: 'Checkout - Order Summary',
                path: '/client/store-client/checkout/order-summary',
              },
              {
                title: 'Checkout - Shipping Info',
                path: '/client/store-client/checkout/shipping-info',
              },
              {
                title: 'Checkout - Payment Method',
                path: '/client/store-client/checkout/payment-method',
              },
              {
                title: 'Checkout - Order Placed',
                path: '/client/store-client/checkout/order-placed',
              },
              {
                title: 'Order Receipt',
                path: '/client/store-client/order-receipt',
              },
            ],
          },
        ],
      },
      {
        title: 'User Management',
        children: [
          {
            children: [
              {
                title: 'Users',
                path: '/client/user-management/users',
              },
              {
                title: 'Roles',
                path: '/client/user-management/roles',
              },
              {
                title: 'Permissions',
                path: '/client/user-management/permissions',
              },
              {
                title: 'Account',
                path: '/client/user-management/account',
              },
              {
                title: 'Logs',
                path: '/client/user-management/logs',
              },
              {
                title: 'Settings',
                path: '/client/user-management/settings',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const CLIENT_MENU_MEGA_MOBILE = [
  { title: 'Home', path: '/client' },
  {
    title: 'Profiles',
    children: [
      {
        title: 'Profiles',
        children: [
          {
            title: 'Default',
            icon: Badge,
            path: '/client/public-profile/profiles/default',
          },
          {
            title: 'Creator',
            icon: Coffee,
            path: '/client/public-profile/profiles/creator',
          },
          {
            title: 'Company',
            icon: Building,
            path: '/client/public-profile/profiles/company',
          },
          {
            title: 'NFT',
            icon: Bitcoin,
            path: '/client/public-profile/profiles/nft',
          },
          {
            title: 'Blogger',
            icon: MessageSquare,
            path: '/client/public-profile/profiles/blogger',
          },
          {
            title: 'CRM',
            icon: Monitor,
            path: '/client/public-profile/profiles/crm',
          },
          {
            title: 'Gamer',
            icon: Ghost,
            path: '/client/public-profile/profiles/gamer',
          },
          {
            title: 'Feeds',
            icon: Book,
            path: '/client/public-profile/profiles/feeds',
          },
          {
            title: 'Plain',
            icon: File,
            path: '/client/public-profile/profiles/plain',
          },
          {
            title: 'Modal',
            icon: SquareMousePointer,
            path: '/client/public-profile/profiles/modal',
          },
          { title: 'Freelancer', icon: Briefcase, path: '#', disabled: true },
          { title: 'Developer', icon: Code, path: '#', disabled: true },
          { title: 'Team', icon: Users, path: '#', disabled: true },
          { title: 'Events', icon: CalendarCheck, path: '#', disabled: true },
        ],
      },
      {
        title: 'Other Pages',
        children: [
          {
            title: 'Projects - 3 Cols',
            icon: Layout,
            path: '/client/public-profile/projects/3-columns',
          },
          {
            title: 'Projects - 2 Cols',
            icon: Grid,
            path: '/client/public-profile/projects/2-columns',
          },
          {
            title: 'Works',
            icon: WorkIcon,
            path: '/client/public-profile/works',
          },
          {
            title: 'Teams',
            icon: PeopleIcon,
            path: '/client/public-profile/teams',
          },
          {
            title: 'Network',
            icon: Network,
            path: '/client/public-profile/network',
          },
          {
            title: 'Activity',
            icon: TrendingUp,
            path: '/client/public-profile/activity',
          },
          {
            title: 'Campaigns - Card',
            icon: LayoutGrid,
            path: '/client/public-profile/campaigns/card',
          },
          {
            title: 'Campaigns - List',
            icon: Kanban,
            path: '/client/public-profile/campaigns/list',
          },
          {
            title: 'Empty',
            icon: FileText,
            path: '/client/public-profile/empty',
          },
          { title: 'Documents', icon: DocumentIcon, path: '#', disabled: true },
          { title: 'Badges', icon: Award, path: '#', disabled: true },
          { title: 'Awards', icon: Gift, path: '#', disabled: true },
        ],
      },
    ],
  },
  {
    title: 'My Account',
    children: [
      {
        title: 'General Pages',
        children: [
          {
            title: 'Integrations',
            icon: Plug,
            path: '/client/account/integrations',
          },
          {
            title: 'Notifications',
            icon: Bell,
            path: '/client/account/notifications',
          },
          { title: 'API Keys', icon: Key, path: '/client/account/api-keys' },
          {
            title: 'Appearance',
            icon: Eye,
            path: '/client/account/appearance',
          },
          {
            title: 'Invite a Friend',
            icon: UserCheck,
            path: '/client/account/invite-a-friend',
          },
          {
            title: 'Activity',
            icon: LifeBuoy,
            path: '/client/account/activity',
          },
          { title: 'Brand', icon: CheckCircle, disabled: true },
          { title: 'Get Paid', icon: Euro, disabled: true },
        ],
      },
      {
        title: 'Other pages',
        children: [
          {
            title: 'Account Home',
            children: [
              {
                title: 'Get Started',
                path: '/client/account/home/get-started',
              },
              {
                title: 'User Profile',
                path: '/client/account/home/user-profile',
              },
              {
                title: 'Company Profile',
                path: '/client/account/home/company-profile',
              },
              {
                title: 'With Sidebar',
                path: '/client/account/home/settings-sidebar',
              },
              {
                title: 'Enterprise',
                path: '/client/account/home/settings-enterprise',
              },
              { title: 'Plain', path: '/client/account/home/settings-plain' },
              { title: 'Modal', path: '/client/account/home/settings-modal' },
            ],
          },
          {
            title: 'Billing',
            children: [
              { title: 'Basic Billing', path: '/client/account/billing/basic' },
              {
                title: 'Enterprise',
                path: '/client/account/billing/enterprise',
              },
              { title: 'Plans', path: '/client/account/billing/plans' },
              {
                title: 'Billing History',
                path: '/client/account/billing/history',
              },
              { title: 'Tax Info', disabled: true },
              { title: 'Invoices', disabled: true },
              { title: 'Gateaways', disabled: true },
            ],
          },
          {
            title: 'Security',
            children: [
              {
                title: 'Get Started',
                path: '/client/account/security/get-started',
              },
              {
                title: 'Security Overview',
                path: '/client/account/security/overview',
              },
              {
                title: 'IP Addresses',
                path: '/client/account/security/allowed-ip-addresses',
              },
              {
                title: 'Privacy Settings',
                path: '/client/account/security/privacy-settings',
              },
              {
                title: 'Device Management',
                path: '/client/account/security/device-management',
              },
              {
                title: 'Backup & Recovery',
                path: '/client/account/security/backup-and-recovery',
              },
              {
                title: 'Current Sessions',
                path: '/client/account/security/current-sessions',
              },
              {
                title: 'Security Log',
                path: '/client/account/security/security-log',
              },
            ],
          },
          {
            title: 'Members & Roles',
            children: [
              {
                title: 'Teams Starter',
                path: '/client/account/members/team-starter',
              },
              { title: 'Teams', path: '/client/account/members/teams' },
              { title: 'Team Info', path: '/client/account/members/team-info' },
              {
                title: 'Members Starter',
                path: '/client/account/members/members-starter',
              },
              {
                title: 'Team Members',
                path: '/client/account/members/team-members',
              },
              {
                title: 'Import Members',
                path: '/client/account/members/import-members',
              },
              { title: 'Roles', path: '/client/account/members/roles' },
              {
                title: 'Permissions - Toggler',
                path: '/client/account/members/permissions-toggle',
              },
              {
                title: 'Permissions - Check',
                path: '/client/account/members/permissions-check',
              },
            ],
          },
          {
            title: 'Other Pages',
            children: [
              { title: 'Integrations', path: '/client/account/integrations' },
              { title: 'Notifications', path: '/client/account/notifications' },
              { title: 'API Keys', path: '/client/account/api-keys' },
              { title: 'Appearance', path: '/client/account/appearance' },
              {
                title: 'Invite a Friend',
                path: '/client/account/invite-a-friend',
              },
              { title: 'Activity', path: '/client/account/activity' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Network',
    children: [
      {
        title: 'General Pages',
        children: [
          {
            title: 'Get Started',
            icon: Flag,
            path: '/client/network/get-started',
          },
          { title: 'Colleagues', icon: Users, path: '#', disabled: true },
          { title: 'Donators', icon: Heart, path: '#', disabled: true },
          { title: 'Leads', icon: Zap, path: '#', disabled: true },
        ],
      },
      {
        title: 'Other pages',
        children: [
          {
            title: 'User Cards',
            children: [
              {
                title: 'Mini Cards',
                path: '/client/network/user-cards/mini-cards',
              },
              {
                title: 'Team Members',
                path: '/client/network/user-cards/team-crew',
              },
              { title: 'Authors', path: '/client/network/user-cards/author' },
              { title: 'NFT Users', path: '/client/network/user-cards/nft' },
              {
                title: 'Social Users',
                path: '/client/network/user-cards/social',
              },
              { title: 'Gamers', path: '#', disabled: true },
            ],
          },
          {
            title: 'User Base',
            badge: 'Datatables',
            children: [
              {
                title: 'Team Crew',
                path: '/client/network/user-table/team-crew',
              },
              {
                title: 'App Roster',
                path: '/client/network/user-table/app-roster',
              },
              {
                title: 'Market Authors',
                path: '/client/network/user-table/market-authors',
              },
              {
                title: 'SaaS Users',
                path: '/client/network/user-table/saas-users',
              },
              {
                title: 'Store Clients',
                path: '/client/network/user-table/store-clients',
              },
              {
                title: 'Visitors',
                path: '/client/network/user-table/visitors',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'User Management',
    icon: Users,
    children: [
      {
        title: 'Users',
        path: '/client/user-management/users',
      },
      {
        title: 'Roles',
        path: '/client/user-management/roles',
      },
      {
        title: 'Permissions',
        path: '/client/user-management/permissions',
      },
      {
        title: 'Account',
        path: '/client/user-management/account',
      },
      {
        title: 'Logs',
        path: '/client/user-management/logs',
      },
      {
        title: 'Settings',
        path: '/client/user-management/settings',
      },
    ],
  },
  {
    title: 'Store - Client',
    children: [
      { title: 'Home', path: '/client/store-client/home' },
      {
        title: 'Search Results - Grid',
        path: '/client/store-client/search-results-grid',
      },
      {
        title: 'Search Results - List',
        path: '/client/store-client/search-results-list',
      },
      {
        title: 'Product Details',
        path: '/client/store-client/product-details',
      },
      { title: 'Wishlist', path: '/client/store-client/wishlist' },
      {
        title: 'Checkout',
        children: [
          {
            title: 'Order Summary',
            path: '/client/store-client/checkout/order-summary',
          },
          {
            title: 'Shipping Info',
            path: '/client/store-client/checkout/shipping-info',
          },
          {
            title: 'Payment Method',
            path: '/client/store-client/checkout/payment-method',
          },
          {
            title: 'Order Placed',
            path: '/client/store-client/checkout/order-placed',
          },
        ],
      },
      { title: 'My Orders', path: '/client/store-client/my-orders' },
      { title: 'Order Receipt', path: '/client/store-client/order-receipt' },
    ],
  },
];
