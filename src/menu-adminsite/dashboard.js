// third-party
import { FormattedMessage } from 'react-intl';

// assets
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'Insights',
      title: <FormattedMessage id="Insights" />,
      type: 'item',
      url: 'insights'
    },
    {
      id: 'Members',
      title: <FormattedMessage id="Members" />,
      type: 'item',
      url: 'members'
    },
    {
      id: 'Workspace',
      title: <FormattedMessage id="Workspace" />,
      type: 'item',
      url: 'app'
    },
    {
      id: 'Security',
      title: <FormattedMessage id="Privacy and Security" />,
      type: 'item',
      url: 'security'
    },
    {
      id: 'Resources',
      title: <FormattedMessage id="Resources" />,
      type: 'item',
      url: 'resources'
    },
    {
      id: 'Billing',
      title: <FormattedMessage id="Billing" />,
      type: 'item',
      url: 'billing'
    },
    {
      id: 'Feedback',
      title: <FormattedMessage id="Report Issue" />,
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
