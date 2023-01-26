// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined, GoldOutlined, HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  GoldOutlined,
  HomeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined
    },
    {
      id: 'gigs',
      title: <FormattedMessage id="Gigs" />,
      type: 'item',
      url: '/gigs',
      icon: icons.DashboardOutlined
    },
    {
      id: 'projects',
      title: <FormattedMessage id="Projects" />,
      type: 'item',
      url: '/projects',
      icon: icons.DashboardOutlined
    }
  ]
};

export default dashboard;
