import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// project import
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// render - landing page
const PagesLanding = Loadable(lazy(() => import('pages/landing')));
const BrowseProducts = Loadable(lazy(() => import('pages/browse')));
const BrowseDetails = Loadable(lazy(() => import('pages/browse/product-details')));

const Profile = Loadable(lazy(() => import('pages/profile')));
const UserTabPersonal = Loadable(lazy(() => import('pages/profile/TabPersonal')));

const Requirements = Loadable(lazy(() => import('pages/requirements')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <CommonLayout layout="landing" />,
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
            }
          ]
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
