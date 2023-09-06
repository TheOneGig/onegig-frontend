// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  ClockCircleOutlined,
  DashboardOutlined,
  FolderViewOutlined,
  PicLeftOutlined,
  CalendarOutlined,
  UsergroupAddOutlined,
  ProjectOutlined,
  CommentOutlined,
  DiffOutlined
} from '@ant-design/icons';
import { Tooltip } from '@mantine/core';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const sidebarItems = (workspaceId) => {
  const dashboard = {
    id: 'group-dashboard',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: <FormattedMessage id="dashboard" />,
        type: 'item',
        url: `/${workspaceId}/dashboard`,
        icon: DashboardOutlined
      },
      {
        id: 'Tasks',
        title: <FormattedMessage id="Tasks" />,
        type: 'item',
        url: `/${workspaceId}/apps/kanban/board`,
        icon: ProjectOutlined
      },
      {
        id: 'CRM',
        title: <FormattedMessage id="CRM" />,
        type: 'item',
        url: `/${workspaceId}/crm`,
        icon: UsergroupAddOutlined
      },
      {
        id: 'Proposals',
        title: <FormattedMessage id="Proposals" />,
        type: 'item',
        url: `/${workspaceId}/gigs`,
        icon: FolderViewOutlined
      },
      {
        id: 'Projects',
        title: <FormattedMessage id="Projects" />,
        type: 'item',
        url: `/${workspaceId}/projects`,
        icon: PicLeftOutlined
      },
      {
        id: 'Inbox',
        title: <FormattedMessage id="Inbox" />,
        type: 'item',
        url: `/${workspaceId}/chat`,
        icon: CommentOutlined
      },
      {
        id: 'Time Sheets',
        title: <FormattedMessage id="Times" />,
        type: 'item',
        url: `/${workspaceId}/times`,
        icon: ClockCircleOutlined
      },
      {
        id: 'Calendar',
        title: <FormattedMessage id="Calendar" />,
        type: 'item',
        url: `/${workspaceId}/calendar`,
        icon: CalendarOutlined
      },
      {
        id: 'Templates',
        title: (
          <Tooltip label="Coming Soon" color="#1dbeea">
            <FormattedMessage id="Templates" />
          </Tooltip>
        ),
        type: 'item',
        url: `/${workspaceId}/templates`,
        icon: DiffOutlined
      }
    ]
  };
  return dashboard;
};

export default sidebarItems;
