import i18n from 'i18next';
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

export const FREELANCER_MENU_SIDEBAR_FUNCTION = () => {
  const t = (key) => {
    return i18n.isInitialized ? i18n.t(`${key}`, { ns: 'menuSidebar' }) : key;
  };
  const menu = [
    {
      title: t('dashboards'),
      icon: LayoutGrid,
      children: [
        { title: t('lightSidebar'), path: '/freelancer' },
        { title: t('darkSidebar'), path: '/freelancer/dark-sidebar' },
      ],
    },
    { heading: t('freelancer') },
    {
      title: t('profile'),
      icon: UserCircle,
      children: [
        {
          title: t('profile'),
          path: '/freelancer/public-profile/profile',
        },
        {
          title: t('portfolio'),
          path: '/freelancer/public-profile/portfolio',
        },
        {
          title: t('services'),
          path: '/freelancer/public-profile/services',
        },
        {
          title: t('experience'),
          path: '/freelancer/public-profile/experience',
        },
        {
          title: t('workHistory'),
          path: '/freelancer/public-profile/work-history',
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
            {
              title: 'Get Started',
              path: '/freelancer/account/home/get-started',
            },
            {
              title: 'User Profile',
              path: '/freelancer/account/home/user-profile',
            },
            {
              title: 'Company Profile',
              path: '/freelancer/account/home/company-profile',
            },
            {
              title: 'Settings - With Sidebar',
              path: '/freelancer/account/home/settings-sidebar',
            },
            {
              title: 'Settings - Enterprise',
              path: '/freelancer/account/home/settings-enterprise',
            },
            {
              title: 'Settings - Plain',
              path: '/freelancer/account/home/settings-plain',
            },
            {
              title: 'Settings - Modal',
              path: '/freelancer/account/home/settings-modal',
            },
          ],
        },
        {
          title: 'Billing',
          children: [
            {
              title: 'Billing - Basic',
              path: '/freelancer/account/billing/basic',
            },
            {
              title: 'Billing - Enterprise',
              path: '/freelancer/account/billing/enterprise',
            },
            { title: 'Plans', path: '/freelancer/account/billing/plans' },
            {
              title: 'Billing History',
              path: '/freelancer/account/billing/history',
            },
          ],
        },
        {
          title: 'Security',
          children: [
            {
              title: 'Get Started',
              path: '/freelancer/account/security/get-started',
            },
            {
              title: 'Security Overview',
              path: '/freelancer/account/security/overview',
            },
            {
              title: 'Allowed IP Addresses',
              path: '/freelancer/account/security/allowed-ip-addresses',
            },
            {
              title: 'Privacy Settings',
              path: '/freelancer/account/security/privacy-settings',
            },
            {
              title: 'Device Management',
              path: '/freelancer/account/security/device-management',
            },
            {
              title: 'Backup & Recovery',
              path: '/freelancer/account/security/backup-and-recovery',
            },
            {
              title: 'Current Sessions',
              path: '/freelancer/account/security/current-sessions',
            },
            {
              title: 'Security Log',
              path: '/freelancer/account/security/security-log',
            },
          ],
        },
        {
          title: 'Members & Roles',
          children: [
            {
              title: 'Teams Starter',
              path: '/freelancer/account/members/team-starter',
            },
            { title: 'Teams', path: '/freelancer/account/members/teams' },
            {
              title: 'Team Info',
              path: '/freelancer/account/members/team-info',
            },
            {
              title: 'Members Starter',
              path: '/freelancer/account/members/members-starter',
            },
            {
              title: 'Team Members',
              path: '/freelancer/account/members/team-members',
            },
            {
              title: 'Import Members',
              path: '/freelancer/account/members/import-members',
            },
            { title: 'Roles', path: '/freelancer/account/members/roles' },
            {
              title: 'Permissions - Toggler',
              path: '/freelancer/account/members/permissions-toggle',
            },
            {
              title: 'Permissions - Check',
              path: '/freelancer/account/members/permissions-check',
            },
          ],
        },
        { title: 'Integrations', path: '/freelancer/account/integrations' },
        { title: 'Notifications', path: '/freelancer/account/notifications' },
        { title: 'API Keys', path: '/freelancer/account/api-keys' },
        {
          title: 'More',
          collapse: true,
          collapseTitle: 'Show less',
          expandTitle: 'Show 3 more',
          children: [
            { title: 'Appearance', path: '/freelancer/account/appearance' },
            {
              title: 'Invite a Friend',
              path: '/freelancer/account/invite-a-friend',
            },
            { title: 'Activity', path: '/freelancer/account/activity' },
          ],
        },
      ],
    },
    {
      title: 'Network',
      icon: Users,
      children: [
        { title: 'Get Started', path: '/freelancer/network/get-started' },
        {
          title: 'User Cards',
          children: [
            {
              title: 'Mini Cards',
              path: '/freelancer/network/user-cards/mini-cards',
            },
            {
              title: 'Team Crew',
              path: '/freelancer/network/user-cards/team-crew',
            },
            {
              title: 'Author',
              path: '/freelancer/network/user-cards/author',
            },
            { title: 'NFT', path: '/freelancer/network/user-cards/nft' },
            {
              title: 'Social',
              path: '/freelancer/network/user-cards/social',
            },
          ],
        },
        {
          title: 'User Table',
          children: [
            {
              title: 'Team Crew',
              path: '/freelancer/network/user-table/team-crew',
            },
            {
              title: 'App Roster',
              path: '/freelancer/network/user-table/app-roster',
            },
            {
              title: 'Market Authors',
              path: '/freelancer/network/user-table/market-authors',
            },
            {
              title: 'SaaS Users',
              path: '/freelancer/network/user-table/saas-users',
            },
            {
              title: 'Store Clients',
              path: '/freelancer/network/user-table/store-clients',
            },
            {
              title: 'Visitors',
              path: '/freelancer/network/user-table/visitors',
            },
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
          path: '/freelancer/user-management/users',
        },
        {
          title: 'Roles',
          path: '/freelancer/user-management/roles',
        },
        {
          title: 'Permissions',
          path: '/freelancer/user-management/permissions',
        },
        {
          title: 'Account',
          path: '/freelancer/user-management/account',
        },
        {
          title: 'Logs',
          path: '/freelancer/user-management/logs',
        },
        {
          title: 'Settings',
          path: '/freelancer/user-management/settings',
        },
      ],
    },
    {
      title: 'Store - Client',
      icon: Users,
      children: [
        { title: 'Home', path: '/freelancer/store-client/home' },
        {
          title: 'Search Results - Grid',
          path: '/freelancer/store-client/search-results-grid',
        },
        {
          title: 'Search Results - List',
          path: '/freelancer/store-client/search-results-list',
        },
        {
          title: 'Product Details',
          path: '/freelancer/store-client/product-details',
        },
        { title: 'Wishlist', path: '/freelancer/store-client/wishlist' },
        {
          title: 'Checkout',
          children: [
            {
              title: 'Order Summary',
              path: '/freelancer/store-client/checkout/order-summary',
            },
            {
              title: 'Shipping Info',
              path: '/freelancer/store-client/checkout/shipping-info',
            },
            {
              title: 'Payment Method',
              path: '/freelancer/store-client/checkout/payment-method',
            },
            {
              title: 'Order Placed',
              path: '/freelancer/store-client/checkout/order-placed',
            },
          ],
        },
        { title: 'My Orders', path: '/freelancer/store-client/my-orders' },
        {
          title: 'Order Receipt',
          path: '/freelancer/store-client/order-receipt',
        },
      ],
    },
  ];
  return menu;
};

export const FREELANCER_MENU_SIDEBAR = FREELANCER_MENU_SIDEBAR_FUNCTION();

// export const FREELANCER_MENU_SIDEBAR = [
//   {
//     title: t('dashboards') || 'Dashboards',
//     icon: LayoutGrid,
//     children: [
//       { title: t('lightSidebar'), path: '/freelancer' },
//       { title: t('darkSidebar'), path: '/freelancer/dark-sidebar' },
//     ],
//   },
//   { heading: t('freelancer') },
//   {
//     title: t('profile'),
//     icon: UserCircle,
//     children: [
//       {
//         title: t('profile'),
//         path: '/freelancer/public-profile/profile',
//       },
//       { title: t('portfolio'), path: '/freelancer/public-profile/portfolio' },
//       {
//         title: t('services'),
//         path: '/freelancer/public-profile/services',
//       },
//       { title: t('experience'), path: '/freelancer/public-profile/experience' },
//       {
//         title: t('workHistory'),
//         path: '/freelancer/public-profile/work-history',
//       },
//     ],
//   },
//   {
//     title: 'My Account',
//     icon: Settings,
//     children: [
//       {
//         title: 'Account',
//         children: [
//           {
//             title: 'Get Started',
//             path: '/freelancer/account/home/get-started',
//           },
//           {
//             title: 'User Profile',
//             path: '/freelancer/account/home/user-profile',
//           },
//           {
//             title: 'Company Profile',
//             path: '/freelancer/account/home/company-profile',
//           },
//           {
//             title: 'Settings - With Sidebar',
//             path: '/freelancer/account/home/settings-sidebar',
//           },
//           {
//             title: 'Settings - Enterprise',
//             path: '/freelancer/account/home/settings-enterprise',
//           },
//           {
//             title: 'Settings - Plain',
//             path: '/freelancer/account/home/settings-plain',
//           },
//           {
//             title: 'Settings - Modal',
//             path: '/freelancer/account/home/settings-modal',
//           },
//         ],
//       },
//       {
//         title: 'Billing',
//         children: [
//           {
//             title: 'Billing - Basic',
//             path: '/freelancer/account/billing/basic',
//           },
//           {
//             title: 'Billing - Enterprise',
//             path: '/freelancer/account/billing/enterprise',
//           },
//           { title: 'Plans', path: '/freelancer/account/billing/plans' },
//           {
//             title: 'Billing History',
//             path: '/freelancer/account/billing/history',
//           },
//         ],
//       },
//       {
//         title: 'Security',
//         children: [
//           {
//             title: 'Get Started',
//             path: '/freelancer/account/security/get-started',
//           },
//           {
//             title: 'Security Overview',
//             path: '/freelancer/account/security/overview',
//           },
//           {
//             title: 'Allowed IP Addresses',
//             path: '/freelancer/account/security/allowed-ip-addresses',
//           },
//           {
//             title: 'Privacy Settings',
//             path: '/freelancer/account/security/privacy-settings',
//           },
//           {
//             title: 'Device Management',
//             path: '/freelancer/account/security/device-management',
//           },
//           {
//             title: 'Backup & Recovery',
//             path: '/freelancer/account/security/backup-and-recovery',
//           },
//           {
//             title: 'Current Sessions',
//             path: '/freelancer/account/security/current-sessions',
//           },
//           {
//             title: 'Security Log',
//             path: '/freelancer/account/security/security-log',
//           },
//         ],
//       },
//       {
//         title: 'Members & Roles',
//         children: [
//           {
//             title: 'Teams Starter',
//             path: '/freelancer/account/members/team-starter',
//           },
//           { title: 'Teams', path: '/freelancer/account/members/teams' },
//           { title: 'Team Info', path: '/freelancer/account/members/team-info' },
//           {
//             title: 'Members Starter',
//             path: '/freelancer/account/members/members-starter',
//           },
//           {
//             title: 'Team Members',
//             path: '/freelancer/account/members/team-members',
//           },
//           {
//             title: 'Import Members',
//             path: '/freelancer/account/members/import-members',
//           },
//           { title: 'Roles', path: '/freelancer/account/members/roles' },
//           {
//             title: 'Permissions - Toggler',
//             path: '/freelancer/account/members/permissions-toggle',
//           },
//           {
//             title: 'Permissions - Check',
//             path: '/freelancer/account/members/permissions-check',
//           },
//         ],
//       },
//       { title: 'Integrations', path: '/freelancer/account/integrations' },
//       { title: 'Notifications', path: '/freelancer/account/notifications' },
//       { title: 'API Keys', path: '/freelancer/account/api-keys' },
//       {
//         title: 'More',
//         collapse: true,
//         collapseTitle: 'Show less',
//         expandTitle: 'Show 3 more',
//         children: [
//           { title: 'Appearance', path: '/freelancer/account/appearance' },
//           {
//             title: 'Invite a Friend',
//             path: '/freelancer/account/invite-a-friend',
//           },
//           { title: 'Activity', path: '/freelancer/account/activity' },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Network',
//     icon: Users,
//     children: [
//       { title: 'Get Started', path: '/freelancer/network/get-started' },
//       {
//         title: 'User Cards',
//         children: [
//           {
//             title: 'Mini Cards',
//             path: '/freelancer/network/user-cards/mini-cards',
//           },
//           {
//             title: 'Team Crew',
//             path: '/freelancer/network/user-cards/team-crew',
//           },
//           { title: 'Author', path: '/freelancer/network/user-cards/author' },
//           { title: 'NFT', path: '/freelancer/network/user-cards/nft' },
//           { title: 'Social', path: '/freelancer/network/user-cards/social' },
//         ],
//       },
//       {
//         title: 'User Table',
//         children: [
//           {
//             title: 'Team Crew',
//             path: '/freelancer/network/user-table/team-crew',
//           },
//           {
//             title: 'App Roster',
//             path: '/freelancer/network/user-table/app-roster',
//           },
//           {
//             title: 'Market Authors',
//             path: '/freelancer/network/user-table/market-authors',
//           },
//           {
//             title: 'SaaS Users',
//             path: '/freelancer/network/user-table/saas-users',
//           },
//           {
//             title: 'Store Clients',
//             path: '/freelancer/network/user-table/store-clients',
//           },
//           {
//             title: 'Visitors',
//             path: '/freelancer/network/user-table/visitors',
//           },
//         ],
//       },
//     ],
//   },
//   { heading: 'Apps' },
//   {
//     title: 'User Management',
//     icon: ShieldUser,
//     children: [
//       {
//         title: 'Users',
//         path: '/freelancer/user-management/users',
//       },
//       {
//         title: 'Roles',
//         path: '/freelancer/user-management/roles',
//       },
//       {
//         title: 'Permissions',
//         path: '/freelancer/user-management/permissions',
//       },
//       {
//         title: 'Account',
//         path: '/freelancer/user-management/account',
//       },
//       {
//         title: 'Logs',
//         path: '/freelancer/user-management/logs',
//       },
//       {
//         title: 'Settings',
//         path: '/freelancer/user-management/settings',
//       },
//     ],
//   },
//   {
//     title: 'Store - Client',
//     icon: Users,
//     children: [
//       { title: 'Home', path: '/freelancer/store-client/home' },
//       {
//         title: 'Search Results - Grid',
//         path: '/freelancer/store-client/search-results-grid',
//       },
//       {
//         title: 'Search Results - List',
//         path: '/freelancer/store-client/search-results-list',
//       },
//       {
//         title: 'Product Details',
//         path: '/freelancer/store-client/product-details',
//       },
//       { title: 'Wishlist', path: '/freelancer/store-client/wishlist' },
//       {
//         title: 'Checkout',
//         children: [
//           {
//             title: 'Order Summary',
//             path: '/freelancer/store-client/checkout/order-summary',
//           },
//           {
//             title: 'Shipping Info',
//             path: '/freelancer/store-client/checkout/shipping-info',
//           },
//           {
//             title: 'Payment Method',
//             path: '/freelancer/store-client/checkout/payment-method',
//           },
//           {
//             title: 'Order Placed',
//             path: '/freelancer/store-client/checkout/order-placed',
//           },
//         ],
//       },
//       { title: 'My Orders', path: '/freelancer/store-client/my-orders' },
//       {
//         title: 'Order Receipt',
//         path: '/freelancer/store-client/order-receipt',
//       },
//     ],
//   },
// ];

export const FREELANCER_MENU_MEGA = [
  { title: 'Home', path: '/freelancer' },
  {
    title: 'Profile',
    children: [
      {
        title: 'Profile',
        children: [
          {
            children: [
              {
                title: 'Portfolio',
                icon: WorkIcon,
                path: '/freelancer/public-profile/portfolio',
              },
              {
                title: 'Services',
                icon: Layout,
                path: '/freelancer/public-profile/services',
              },
              {
                title: 'Experience',
                icon: TrendingUp,
                path: '/freelancer/public-profile/experience',
              },
              {
                title: 'Work History',
                icon: PeopleIcon,
                path: '/freelancer/public-profile/work-history',
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
            path: '/freelancer/account/integrations',
          },
          {
            title: 'Notifications',
            icon: Bell,
            path: '/freelancer/account/notifications',
          },
          {
            title: 'API Keys',
            icon: Key,
            path: '/freelancer/account/api-keys',
          },
          {
            title: 'Appearance',
            icon: Eye,
            path: '/freelancer/account/appearance',
          },
          {
            title: 'Invite a Friend',
            icon: UserCheck,
            path: '/freelancer/account/invite-a-friend',
          },
          {
            title: 'Activity',
            icon: LifeBuoy,
            path: '/freelancer/account/activity',
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
                path: '/freelancer/account/home/get-started',
              },
              {
                title: 'User Profile',
                path: '/freelancer/account/home/user-profile',
              },
              {
                title: 'Company Profile',
                path: '/freelancer/account/home/company-profile',
              },
              {
                title: 'With Sidebar',
                path: '/freelancer/account/home/settings-sidebar',
              },
              {
                title: 'Enterprise',
                path: '/freelancer/account/home/settings-enterprise',
              },
              {
                title: 'Plain',
                path: '/freelancer/account/home/settings-plain',
              },
              {
                title: 'Modal',
                path: '/freelancer/account/home/settings-modal',
              },
            ],
          },
          {
            title: 'Billing',
            children: [
              {
                title: 'Basic Billing',
                path: '/freelancer/account/billing/basic',
              },
              {
                title: 'Enterprise',
                path: '/freelancer/account/billing/enterprise',
              },
              { title: 'Plans', path: '/freelancer/account/billing/plans' },
              {
                title: 'Billing History',
                path: '/freelancer/account/billing/history',
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
                path: '/freelancer/account/security/get-started',
              },
              {
                title: 'Security Overview',
                path: '/freelancer/account/security/overview',
              },
              {
                title: 'IP Addresses',
                path: '/freelancer/account/security/allowed-ip-addresses',
              },
              {
                title: 'Privacy Settings',
                path: '/freelancer/account/security/privacy-settings',
              },
              {
                title: 'Device Management',
                path: '/freelancer/account/security/device-management',
              },
              {
                title: 'Backup & Recovery',
                path: '/freelancer/account/security/backup-and-recovery',
              },
              {
                title: 'Current Sessions',
                path: '/freelancer/account/security/current-sessions',
              },
              {
                title: 'Security Log',
                path: '/freelancer/account/security/security-log',
              },
            ],
          },
          {
            title: 'Members & Roles',
            children: [
              {
                title: 'Teams Starter',
                path: '/freelancer/account/members/team-starter',
              },
              { title: 'Teams', path: '/freelancer/account/members/teams' },
              {
                title: 'Team Info',
                path: '/freelancer/account/members/team-info',
              },
              {
                title: 'Members Starter',
                path: '/freelancer/account/members/members-starter',
              },
              {
                title: 'Team Members',
                path: '/freelancer/account/members/team-members',
              },
              {
                title: 'Import Members',
                path: '/freelancer/account/members/import-members',
              },
              { title: 'Roles', path: '/freelancer/account/members/roles' },
              {
                title: 'Permissions - Toggler',
                path: '/freelancer/account/members/permissions-toggle',
              },
              {
                title: 'Permissions - Check',
                path: '/freelancer/account/members/permissions-check',
              },
            ],
          },
          {
            title: 'Other Pages',
            children: [
              {
                title: 'Integrations',
                path: '/freelancer/account/integrations',
              },
              {
                title: 'Notifications',
                path: '/freelancer/account/notifications',
              },
              { title: 'API Keys', path: '/freelancer/account/api-keys' },
              { title: 'Appearance', path: '/freelancer/account/appearance' },
              {
                title: 'Invite a Friend',
                path: '/freelancer/account/invite-a-friend',
              },
              { title: 'Activity', path: '/freelancer/account/activity' },
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
            path: '/freelancer/network/get-started',
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
                path: '/freelancer/network/user-cards/mini-cards',
              },
              {
                title: 'Team Members',
                path: '/freelancer/network/user-cards/team-crew',
              },
              {
                title: 'Authors',
                path: '/freelancer/network/user-cards/author',
              },
              {
                title: 'NFT Users',
                path: '/freelancer/network/user-cards/nft',
              },
              {
                title: 'Social Users',
                path: '/freelancer/network/user-cards/social',
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
                path: '/freelancer/network/user-table/team-crew',
              },
              {
                title: 'App Roster',
                path: '/freelancer/network/user-table/app-roster',
              },
              {
                title: 'Market Authors',
                path: '/freelancer/network/user-table/market-authors',
              },
              {
                title: 'SaaS Users',
                path: '/freelancer/network/user-table/saas-users',
              },
              {
                title: 'Store Clients',
                path: '/freelancer/network/user-table/store-clients',
              },
              {
                title: 'Visitors',
                path: '/freelancer/network/user-table/visitors',
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
              { title: 'Home', path: '/freelancer/store-client/home' },
              {
                title: 'Search Results - Grid',
                path: '/freelancer/store-client/search-results-grid',
              },
              {
                title: 'Search Results - List',
                path: '/freelancer/store-client/search-results-list',
              },
              {
                title: 'Product Details',
                path: '/freelancer/store-client/product-details',
              },
              { title: 'Wishlist', path: '/freelancer/store-client/wishlist' },
              {
                title: 'My Orders',
                path: '/freelancer/store-client/my-orders',
              },
            ],
          },
          {
            children: [
              {
                title: 'Checkout - Order Summary',
                path: '/freelancer/store-client/checkout/order-summary',
              },
              {
                title: 'Checkout - Shipping Info',
                path: '/freelancer/store-client/checkout/shipping-info',
              },
              {
                title: 'Checkout - Payment Method',
                path: '/freelancer/store-client/checkout/payment-method',
              },
              {
                title: 'Checkout - Order Placed',
                path: '/freelancer/store-client/checkout/order-placed',
              },
              {
                title: 'Order Receipt',
                path: '/freelancer/store-client/order-receipt',
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
                path: '/freelancer/user-management/users',
              },
              {
                title: 'Roles',
                path: '/freelancer/user-management/roles',
              },
              {
                title: 'Permissions',
                path: '/freelancer/user-management/permissions',
              },
              {
                title: 'Account',
                path: '/freelancer/user-management/account',
              },
              {
                title: 'Logs',
                path: '/freelancer/user-management/logs',
              },
              {
                title: 'Settings',
                path: '/freelancer/user-management/settings',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const FREELANCER_MENU_MEGA_MOBILE = [
  { title: 'Home', path: '/freelancer' },
  {
    title: 'Profile',
    children: [
      {
        title: 'Profile',
        children: [
          {
            title: 'Profile',
            icon: Badge,
            path: '/freelancer/public-profile/profile',
          },
        ],
      },
      {
        title: 'Other Pages',
        children: [
          {
            title: 'Portfolio',
            icon: WorkIcon,
            path: '/freelancer/public-profile/portfolio',
          },
          {
            title: 'Services',
            icon: WorkIcon,
            path: '/freelancer/public-profile/services',
          },
          {
            title: 'Experience',
            icon: TrendingUp,
            path: '/freelancer/public-profile/experience',
          },
          {
            title: 'Work History',
            icon: PeopleIcon,
            path: '/freelancer/public-profile/work-history',
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
            path: '/freelancer/account/integrations',
          },
          {
            title: 'Notifications',
            icon: Bell,
            path: '/freelancer/account/notifications',
          },
          {
            title: 'API Keys',
            icon: Key,
            path: '/freelancer/account/api-keys',
          },
          {
            title: 'Appearance',
            icon: Eye,
            path: '/freelancer/account/appearance',
          },
          {
            title: 'Invite a Friend',
            icon: UserCheck,
            path: '/freelancer/account/invite-a-friend',
          },
          {
            title: 'Activity',
            icon: LifeBuoy,
            path: '/freelancer/account/activity',
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
                path: '/freelancer/account/home/get-started',
              },
              {
                title: 'User Profile',
                path: '/freelancer/account/home/user-profile',
              },
              {
                title: 'Company Profile',
                path: '/freelancer/account/home/company-profile',
              },
              {
                title: 'With Sidebar',
                path: '/freelancer/account/home/settings-sidebar',
              },
              {
                title: 'Enterprise',
                path: '/freelancer/account/home/settings-enterprise',
              },
              {
                title: 'Plain',
                path: '/freelancer/account/home/settings-plain',
              },
              {
                title: 'Modal',
                path: '/freelancer/account/home/settings-modal',
              },
            ],
          },
          {
            title: 'Billing',
            children: [
              {
                title: 'Basic Billing',
                path: '/freelancer/account/billing/basic',
              },
              {
                title: 'Enterprise',
                path: '/freelancer/account/billing/enterprise',
              },
              { title: 'Plans', path: '/freelancer/account/billing/plans' },
              {
                title: 'Billing History',
                path: '/freelancer/account/billing/history',
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
                path: '/freelancer/account/security/get-started',
              },
              {
                title: 'Security Overview',
                path: '/freelancer/account/security/overview',
              },
              {
                title: 'IP Addresses',
                path: '/freelancer/account/security/allowed-ip-addresses',
              },
              {
                title: 'Privacy Settings',
                path: '/freelancer/account/security/privacy-settings',
              },
              {
                title: 'Device Management',
                path: '/freelancer/account/security/device-management',
              },
              {
                title: 'Backup & Recovery',
                path: '/freelancer/account/security/backup-and-recovery',
              },
              {
                title: 'Current Sessions',
                path: '/freelancer/account/security/current-sessions',
              },
              {
                title: 'Security Log',
                path: '/freelancer/account/security/security-log',
              },
            ],
          },
          {
            title: 'Members & Roles',
            children: [
              {
                title: 'Teams Starter',
                path: '/freelancer/account/members/team-starter',
              },
              { title: 'Teams', path: '/freelancer/account/members/teams' },
              {
                title: 'Team Info',
                path: '/freelancer/account/members/team-info',
              },
              {
                title: 'Members Starter',
                path: '/freelancer/account/members/members-starter',
              },
              {
                title: 'Team Members',
                path: '/freelancer/account/members/team-members',
              },
              {
                title: 'Import Members',
                path: '/freelancer/account/members/import-members',
              },
              { title: 'Roles', path: '/freelancer/account/members/roles' },
              {
                title: 'Permissions - Toggler',
                path: '/freelancer/account/members/permissions-toggle',
              },
              {
                title: 'Permissions - Check',
                path: '/freelancer/account/members/permissions-check',
              },
            ],
          },
          {
            title: 'Other Pages',
            children: [
              {
                title: 'Integrations',
                path: '/freelancer/account/integrations',
              },
              {
                title: 'Notifications',
                path: '/freelancer/account/notifications',
              },
              { title: 'API Keys', path: '/freelancer/account/api-keys' },
              { title: 'Appearance', path: '/freelancer/account/appearance' },
              {
                title: 'Invite a Friend',
                path: '/freelancer/account/invite-a-friend',
              },
              { title: 'Activity', path: '/freelancer/account/activity' },
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
            path: '/freelancer/network/get-started',
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
                path: '/freelancer/network/user-cards/mini-cards',
              },
              {
                title: 'Team Members',
                path: '/freelancer/network/user-cards/team-crew',
              },
              {
                title: 'Authors',
                path: '/freelancer/network/user-cards/author',
              },
              {
                title: 'NFT Users',
                path: '/freelancer/network/user-cards/nft',
              },
              {
                title: 'Social Users',
                path: '/freelancer/network/user-cards/social',
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
                path: '/freelancer/network/user-table/team-crew',
              },
              {
                title: 'App Roster',
                path: '/freelancer/network/user-table/app-roster',
              },
              {
                title: 'Market Authors',
                path: '/freelancer/network/user-table/market-authors',
              },
              {
                title: 'SaaS Users',
                path: '/freelancer/network/user-table/saas-users',
              },
              {
                title: 'Store Clients',
                path: '/freelancer/network/user-table/store-clients',
              },
              {
                title: 'Visitors',
                path: '/freelancer/network/user-table/visitors',
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
        path: '/freelancer/user-management/users',
      },
      {
        title: 'Roles',
        path: '/freelancer/user-management/roles',
      },
      {
        title: 'Permissions',
        path: '/freelancer/user-management/permissions',
      },
      {
        title: 'Account',
        path: '/freelancer/user-management/account',
      },
      {
        title: 'Logs',
        path: '/freelancer/user-management/logs',
      },
      {
        title: 'Settings',
        path: '/freelancer/user-management/settings',
      },
    ],
  },
  {
    title: 'Store - Client',
    children: [
      { title: 'Home', path: '/freelancer/store-client/home' },
      {
        title: 'Search Results - Grid',
        path: '/freelancer/store-client/search-results-grid',
      },
      {
        title: 'Search Results - List',
        path: '/freelancer/store-client/search-results-list',
      },
      {
        title: 'Product Details',
        path: '/freelancer/store-client/product-details',
      },
      { title: 'Wishlist', path: '/freelancer/store-client/wishlist' },
      {
        title: 'Checkout',
        children: [
          {
            title: 'Order Summary',
            path: '/freelancer/store-client/checkout/order-summary',
          },
          {
            title: 'Shipping Info',
            path: '/freelancer/store-client/checkout/shipping-info',
          },
          {
            title: 'Payment Method',
            path: '/freelancer/store-client/checkout/payment-method',
          },
          {
            title: 'Order Placed',
            path: '/freelancer/store-client/checkout/order-placed',
          },
        ],
      },
      { title: 'My Orders', path: '/freelancer/store-client/my-orders' },
      {
        title: 'Order Receipt',
        path: '/freelancer/store-client/order-receipt',
      },
    ],
  },
];
