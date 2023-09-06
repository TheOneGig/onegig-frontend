// third-party
import { FormattedMessage } from 'react-intl';

// assets

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'Home',
      title: <FormattedMessage id="Home" />,
      type: 'item',
      url: 'home'
    },
    {
      id: 'Inbox',
      title: <FormattedMessage id="Inbox" />,
      type: 'item',
      url: 'inbox'
    },
    {
      id: 'Resources',
      title: <FormattedMessage id="Resources" />,
      type: 'item',
      url: 'resources'
    },
    {
      id: 'Contracts',
      title: <FormattedMessage id="Contracts" />,
      type: 'item',
      url: 'contracts'
    },
    {
      id: 'Meeting',
      title: <FormattedMessage id="Meeting" />,
      type: 'item',
      url: 'meeting'
    },
    {
      id: 'Billing',
      title: <FormattedMessage id="Billing" />,
      type: 'item',
      url: 'billing'
    },
    {
      id: 'Report-issue',
      title: <FormattedMessage id="Report Issue" />,
      type: 'item',
      url: 'report-issue'
    },
    {
      id: 'contactus',
      title: <FormattedMessage id="Contact Us" />,
      type: 'item',
      url: 'contact-us'
    }
  ]
};

export default dashboard;
