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
  CalendarOutlined,
  UsergroupAddOutlined,
  SnippetsOutlined,
  ProjectOutlined,
  CommentOutlined,
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
      id: 'Tasks',
      title: <FormattedMessage id="Tasks" />,
      type: 'item',
      url: '/apps/kanban/board',
      icon: ProjectOutlined
    },
    {
      id: 'CRM',
      title: <FormattedMessage id="CRM" />,
      type: 'item',
      url: '/crm',
      icon: UsergroupAddOutlined
    },
    {
      id: 'Proposals',
      title: <FormattedMessage id="Proposals" />,
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
      id: 'Inbox',
      title: <FormattedMessage id="Inbox" />,
      type: 'item',
      url: '/chat',
      icon: CommentOutlined
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
      id: 'Calendar',
      title: <FormattedMessage id="Calendar" />,
      type: 'item',
      url: '/calendar',
      icon: CalendarOutlined
    },
    {
      id: 'Notes',
      title: <FormattedMessage id="Notes" />,
      type: 'item',
      url: '/notes',
      icon: SnippetsOutlined
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
