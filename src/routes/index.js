import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// project import
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import CompanyProfileForm from 'components/workspace/CompanyProfileForm';

// render - landing page
const PagesLanding = Loadable(lazy(() => import('pages/landing')));
const BrowseProducts = Loadable(lazy(() => import('pages/browse')));
const BrowseDetails = Loadable(lazy(() => import('pages/browse/product-details')));

const Profile = Loadable(lazy(() => import('pages/profile')));
const UserTabPersonal = Loadable(lazy(() => import('pages/profile/TabPersonal')));
const Tiers = Loadable(lazy(() => import('pages/tiers')));

const Requirements = Loadable(lazy(() => import('pages/requirements')));
const CreateWorkspace = Loadable(lazy(() => import('pages/auth/create-workspace')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      // element: <CommonLayout layout="landing" />,
      children: [
        {
          path: '/',
          element: <PagesLanding />
        }
      ]
    },
    {
      path: 'browse',
      element: <CommonLayout layout="footer" />,
      children: [
        {
          path: 'all',
          element: <BrowseProducts />
        },
        {
          path: 'gig/:id',
          element: <BrowseDetails />
        }
      ]
    },
    {
      path: 'new',
      element: <CommonLayout layout="footer" />,
      children: [
        {
          path: 'profile',
          element: <Profile />,
          children: [
            {
              path: 'personal',
              element: <UserTabPersonal />
            },
            {
              path: 'company',
              element: <CompanyProfileForm />
            }
          ]
        },
        {
          path: 'subscription',
          element: <Tiers />
        },
        {
          path: 'create-workspace',
          element: <CreateWorkspace />
        }
      ]
    },
    {
      path: 'requirements',
      element: <CommonLayout layout="footer" />,
      children: [
        {
          path: ':projectId',
          element: <Requirements />
        }
      ]
    },

    LoginRoutes,
    MainRoutes
  ]);
}
