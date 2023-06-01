// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  ClockCircleOutlined,
  DashboardOutlined,
  EditOutlined,
  FolderViewOutlined,
  FundOutlined,
  PicLeftOutlined,
  UnorderedListOutlined,
  DiffOutlined
} from '@ant-design/icons';
import { Tooltip } from '@mantine/core';

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
      icon: PicLeftOutlined
    },
    {
      id: 'Time Sheets',
      title: <FormattedMessage id="Times" />,
      type: 'item',
      url: '/times',
      icon: ClockCircleOutlined
    },
    {
      id: 'Finances',
      title: <FormattedMessage id="Finances" />,
      type: 'item',
      url: '/finances',
      icon: FundOutlined
    },
    {
      id: 'To-Do',
      title: <FormattedMessage id="To-Do" />,
      type: 'item',
      url: '/todo',
      icon: UnorderedListOutlined
    },
    {
      id: 'Contracts',
      title: (
        <Tooltip label="Coming Soon" color="#1dbeea">
          <FormattedMessage id="Contracts" />
        </Tooltip>
      ),
      type: 'item',
      url: '/contracts',
      icon: EditOutlined
    },
    {
      id: 'Templates',
      title: (
        <Tooltip label="Coming Soon" color="#1dbeea">
          <FormattedMessage id="Templates" />
        </Tooltip>
      ),
      type: 'item',
      url: '/templates',
      icon: DiffOutlined
    }
  ]
};

export default dashboard;
