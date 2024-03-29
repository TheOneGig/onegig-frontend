import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import AdminSiteLayout from 'layout/AdmineSiteLayout';
import ClientLayout from 'layout/ClientLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import ClientGuard from 'utils/route-guard/ClientGuard';

// render - Real Pages
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Gigs = Loadable(lazy(() => import('pages/gigs')));
const Projects = Loadable(lazy(() => import('pages/projects')));
const ProjectNotes = Loadable(lazy(() => import('pages/notes/projectNotes')));
const CRM = Loadable(lazy(() => import('pages/cmr')));
const Tasks = Loadable(lazy(() => import('pages/tasks')));
const Chat = Loadable(lazy(() => import('pages/chat')));
const Tiers = Loadable(lazy(() => import('pages/tiers')));
const Transaction = Loadable(lazy(() => import('pages/transaction')));
//const ToDo = Loadable(lazy(() => import('pages/todo')));
const Notes = Loadable(lazy(() => import('pages/notes')));

const Profile = Loadable(lazy(() => import('pages/profile')));
const UserTabPersonal = Loadable(lazy(() => import('pages/profile/TabPersonal')));
const UserTabPayment = Loadable(lazy(() => import('pages/profile/TabPayment')));
const UserTabPassword = Loadable(lazy(() => import('pages/profile/TabPassword')));
const UserTabSettings = Loadable(lazy(() => import('pages/profile/TabSettings')));

const Skills = Loadable(lazy(() => import('pages/skills')));
const Finances = Loadable(lazy(() => import('pages/finances')));
const Resources = Loadable(lazy(() => import('pages/resources')));
const Times = Loadable(lazy(() => import('pages/times')));
const Contracts = Loadable(lazy(() => import('pages/contracts')));
const Templates = Loadable(lazy(() => import('pages/templates')));
const EditTemplates = Loadable(lazy(() => import('pages/editTemplate')));

// render - widget
const WidgetStatistics = Loadable(lazy(() => import('pages/widget/statistics')));
const WidgetData = Loadable(lazy(() => import('pages/widget/data')));
const WidgetChart = Loadable(lazy(() => import('pages/widget/chart')));

// render - applications
const AppChat = Loadable(lazy(() => import('pages/apps/chat')));
const AppCalendar = Loadable(lazy(() => import('pages/apps/calendar')));
const AppCustomerList = Loadable(lazy(() => import('pages/apps/customer/list')));

const AppKanban = Loadable(lazy(() => import('pages/apps/kanban')));
const AppKanbanBacklogs = Loadable(lazy(() => import('sections/apps/kanban/Backlogs')));
const AppKanbanBoard = Loadable(lazy(() => import('sections/apps/kanban/Board')));

const UserProfile = Loadable(lazy(() => import('pages/apps/profiles/user')));
const AccountTabRole = Loadable(lazy(() => import('sections/apps/profiles/account/TabRole')));

const AccountProfile = Loadable(lazy(() => import('pages/apps/profiles/account')));
const AccountTabProfile = Loadable(lazy(() => import('sections/apps/profiles/account/TabProfile')));
const AccountTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/account/TabPersonal')));
const AccountTabAccount = Loadable(lazy(() => import('sections/apps/profiles/account/TabAccount')));
const AccountTabPassword = Loadable(lazy(() => import('sections/apps/profiles/account/TabPassword')));
const AccountTabSettings = Loadable(lazy(() => import('sections/apps/profiles/account/TabSettings')));

const ProfileUserList = Loadable(lazy(() => import('pages/apps/profiles/user-list')));
const ProfileUserCard = Loadable(lazy(() => import('pages/apps/profiles/user-card')));

const AppECommProducts = Loadable(lazy(() => import('pages/apps/e-commerce/product')));
const AppECommProductDetails = Loadable(lazy(() => import('pages/apps/e-commerce/product-details')));
const AppECommProductList = Loadable(lazy(() => import('pages/apps/e-commerce/products-list')));
const AppECommCheckout = Loadable(lazy(() => import('pages/apps/e-commerce/checkout')));
const AppECommAddProduct = Loadable(lazy(() => import('pages/apps/e-commerce/add-product')));

// render - forms & tables
const FormsValidation = Loadable(lazy(() => import('pages/forms/validation')));
const FormsWizard = Loadable(lazy(() => import('pages/forms/wizard')));

const FormsLayoutBasic = Loadable(lazy(() => import('pages/forms/layouts/basic')));
const FormsLayoutMultiColumn = Loadable(lazy(() => import('pages/forms/layouts/multi-column')));
const FormsLayoutActionBar = Loadable(lazy(() => import('pages/forms/layouts/action-bar')));
const FormsLayoutStickyBar = Loadable(lazy(() => import('pages/forms/layouts/sticky-bar')));

const FormsPluginsMask = Loadable(lazy(() => import('pages/forms/plugins/mask')));
const FormsPluginsClipboard = Loadable(lazy(() => import('pages/forms/plugins/clipboard')));
const FormsPluginsRecaptcha = Loadable(lazy(() => import('pages/forms/plugins/re-captcha')));
const FormsPluginsEditor = Loadable(lazy(() => import('pages/forms/plugins/editor')));
const FormsPluginsDropzone = Loadable(lazy(() => import('pages/forms/plugins/dropzone')));

// render - charts & map
const ChartApexchart = Loadable(lazy(() => import('pages/charts/apexchart')));
const ChartOrganization = Loadable(lazy(() => import('pages/charts/org-chart')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/check-mail')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/code-verification')));

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

const AppContactUS = Loadable(lazy(() => import('pages/contact-us')));
const AppReportIssue = Loadable(lazy(() => import('pages/report-issue')));

//AdminSiteRoutes
const AdminInsights = Loadable(lazy(() => import('pages/adminSite/insights/AdminInsights')));
const CompanyProfileForm = Loadable(lazy(() => import('components/workspace/index')));
const SecuritySettings = Loadable(lazy(() => import('pages/adminSite/Security')));

//ClientPortalRoutes
const ClientHome = Loadable(lazy(() => import('pages/clientPortal/home')));
const ClientContracts = Loadable(lazy(() => import('pages/clientPortal/contracts')));
const ClientProjects = Loadable(lazy(() => import('pages/clientPortal/projects')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/:workspaceId',
      element: (
        <AuthGuard requiredRoles={['ADMIN', 'USER']}>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },
        {
          path: 'chat',
          element: <AppChat />
        },
        {
          path: 'crm',
          element: <CRM />
        },
        {
          path: 'gigs',
          element: <Gigs />
        },
        {
          path: 'contracts',
          element: <Contracts />
        },
        {
          path: 'templates',
          element: <Templates />
        },
        {
          path: 'edittemplate/:templateId',
          element: <EditTemplates />
        },
        {
          path: 'profile',
          element: <Profile />,
          children: [
            {
              path: 'personal',
              element: <UserTabPersonal />
            },
            // {
            //   path: 'payment',
            //   element: <UserTabPayment />
            // },
            {
              path: 'password',
              element: <UserTabPassword />
            },
            {
              path: 'settings',
              element: <UserTabSettings />
            }
          ]
        },
        {
          path: 'projects',
          element: <Projects />
        },
        {
          path: 'tasks/:projectId',
          element: <Tasks />
        },
        {
          path: 'resources/:projectId',
          element: <Resources />
        },
        {
          path: 'projectNotes/:projectId',
          element: <ProjectNotes />
        },
        {
          path: 'chat/:clientId',
          element: <Chat />
        },
        {
          path: 'tiers',
          element: <Tiers />
        },
        {
          path: 'transaction/:paymentId',
          element: <Transaction />
        },
        {
          path: 'calendar',
          element: <AppCalendar />
        },
        {
          path: 'finances',
          element: <Finances />
        },
        {
          path: 'times',
          element: <Times />
        },
        {
          path: 'notes',
          element: <Notes />
        },
        {
          path: 'contracts',
          element: <Contracts />
        },
        {
          path: 'skills',
          element: <Skills />
        },
        {
          path: 'widget',
          children: [
            {
              path: 'statistics',
              element: <WidgetStatistics />
            },
            {
              path: 'data',
              element: <WidgetData />
            },
            {
              path: 'chart',
              element: <WidgetChart />
            }
          ]
        },
        {
          path: 'apps',
          children: [
            {
              path: 'chat',
              element: <Chat />
            },
            {
              path: 'calendar',
              element: <AppCalendar />
            },
            {
              path: 'kanban',
              element: <AppKanban />,
              children: [
                {
                  path: 'backlogs',
                  element: <AppKanbanBacklogs />
                },
                {
                  path: 'board',
                  element: <AppKanbanBoard />
                }
              ]
            },
            {
              path: 'customer',
              children: [
                {
                  path: 'list',
                  element: <AppCustomerList />
                }
              ]
            },
            {
              path: 'profiles',
              children: [
                {
                  path: 'account',
                  element: <AccountProfile />,
                  children: [
                    {
                      path: 'basic',
                      element: <AccountTabProfile />
                    },
                    {
                      path: 'personal',
                      element: <AccountTabPersonal />
                    },
                    {
                      path: 'my-account',
                      element: <AccountTabAccount />
                    },
                    {
                      path: 'password',
                      element: <AccountTabPassword />
                    },
                    {
                      path: 'role',
                      element: <AccountTabRole />
                    },
                    {
                      path: 'settings',
                      element: <AccountTabSettings />
                    }
                  ]
                },
                {
                  path: 'user',
                  element: <UserProfile />,
                  children: [
                    {
                      path: 'personal',
                      element: <UserTabPersonal />
                    },
                    {
                      path: 'payment',
                      element: <UserTabPayment />
                    },
                    {
                      path: 'password',
                      element: <UserTabPassword />
                    },
                    {
                      path: 'settings',
                      element: <UserTabSettings />
                    }
                  ]
                },
                {
                  path: 'user-list',
                  element: <ProfileUserList />
                },
                {
                  path: 'user-card',
                  element: <ProfileUserCard />
                }
              ]
            },
            {
              path: 'e-commerce',
              children: [
                {
                  path: 'products',
                  element: <AppECommProducts />
                },
                {
                  path: 'product-details/:id',
                  element: <AppECommProductDetails />
                },
                {
                  path: 'product-list',
                  element: <AppECommProductList />
                },
                {
                  path: 'add-new-product',
                  element: <AppECommAddProduct />
                },
                {
                  path: 'checkout',
                  element: <AppECommCheckout />
                }
              ]
            }
          ]
        },
        {
          path: 'forms',
          children: [
            {
              path: 'validation',
              element: <FormsValidation />
            },
            {
              path: 'wizard',
              element: <FormsWizard />
            },
            {
              path: 'layout',
              children: [
                {
                  path: 'basic',
                  element: <FormsLayoutBasic />
                },
                {
                  path: 'multi-column',
                  element: <FormsLayoutMultiColumn />
                },
                {
                  path: 'action-bar',
                  element: <FormsLayoutActionBar />
                },
                {
                  path: 'sticky-bar',
                  element: <FormsLayoutStickyBar />
                }
              ]
            },
            {
              path: 'plugins',
              children: [
                {
                  path: 'mask',
                  element: <FormsPluginsMask />
                },
                {
                  path: 'clipboard',
                  element: <FormsPluginsClipboard />
                },
                {
                  path: 're-captcha',
                  element: <FormsPluginsRecaptcha />
                },
                {
                  path: 'editor',
                  element: <FormsPluginsEditor />
                },
                {
                  path: 'dropzone',
                  element: <FormsPluginsDropzone />
                }
              ]
            }
          ]
        },
        {
          path: 'charts',
          children: [
            {
              path: 'apexchart',
              element: <ChartApexchart />
            },
            {
              path: 'org-chart',
              element: <ChartOrganization />
            }
          ]
        }
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    },
    {
      path: '/auth',
      element: <CommonLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />
        },
        {
          path: 'code-verification',
          element: <AuthCodeVerification />
        }
      ]
    },
    {
      path: '/admin',
      element: (
        <AuthGuard requiredRoles={['ADMIN']}>
          <AdminSiteLayout layout="simple" />,
        </AuthGuard>
      ),
      children: [
        {
          path: 'insights',
          element: <AdminInsights />
        },
        {
          path: 'members',
          element: <AccountTabRole />
        },
        {
          path: 'teams',
          element: <ChartOrganization />
        },
        {
          path: 'security',
          element: <SecuritySettings />
        },
        {
          path: 'billing',
          element: <Tiers />
        },
        {
          path: 'contact-us',
          element: <AppContactUS />
        },
        {
          path: 'report-issue',
          element: <AppReportIssue />
        },
        {
          path: 'app',
          element: <CompanyProfileForm />
        },
        {
          path: 'resources',
          element: <AppKanban />
        }
      ]
    },
    {
      path: '/client/:clientId',
      element: (
        <ClientGuard>
          <ClientLayout layout="simple" />
        </ClientGuard>
      ),
      children: [
        {
          path: 'contracts',
          element: <ClientContracts />
        },
        {
          path: 'home',
          element: <ClientHome />
        },
        {
          path: 'projects',
          element: <ClientProjects />
        },
        {
          path: 'templates',
          element: <Notes />
        },
        {
          path: 'inbox',
          element: <Chat />
        },
        {
          path: 'meeting',
          element: <AppCalendar />
        },
        {
          path: 'contact-us',
          element: <AppContactUS />
        },
        {
          path: 'report-issue',
          element: <AppReportIssue />
        },
        {
          path: 'billing',
          element: <UserTabPayment />
        }
      ]
    },
    {
      path: '/',
      element: <CommonLayout layout="simple" />,
      children: [
        {
          path: 'contact-us',
          element: <AppContactUS />
        }
      ]
    }
  ]
};

export default MainRoutes;
