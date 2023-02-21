// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined, FolderOpenOutlined, FolderViewOutlined, UserAddOutlined } from '@ant-design/icons';

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
      icon: DashboardOutlined
    },
    {
      id: 'Gigs',
      title: <FormattedMessage id="Gigs" />,
      type: 'item',
      url: '/gigs',
      icon: FolderViewOutlined
    },
    {
      id: 'Projects',
      title: <FormattedMessage id="Projects" />,
      type: 'item',
      url: '/projects',
      icon: FolderOpenOutlined
    },
    {
      id: 'Skills',
      title: <FormattedMessage id="Skills" />,
      type: 'item',
      url: '/skills',
      icon: UserAddOutlined
    }
  ]
};

export default dashboard;