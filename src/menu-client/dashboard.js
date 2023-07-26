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
      id: 'Feedback',
      title: <FormattedMessage id="Report a Bug" />,
      type: 'item',
      url: 'https://form.asana.com/?k=7Q_-OkfO7yubSeYa8EgONQ&d=1203786038465620'
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
