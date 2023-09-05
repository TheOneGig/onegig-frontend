// third-party
import { FormattedMessage } from 'react-intl';

// assets

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const sidebarItems = (clientId) => {

const dashboard = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'Home',
      title: <FormattedMessage id="Home" />,
      type: 'item',
      url: `client/${clientId}/home`
    },
    {
      id: 'Inbox',
      title: <FormattedMessage id="Inbox" />,
      type: 'item',
      url: `/client/${clientId}/inbox`
    },
    {
      id: 'Projects',
      title: <FormattedMessage id="Projects" />,
      type: 'item',
      url: `/client/${clientId}/projects`
    },
    {
      id: 'Contracts',
      title: <FormattedMessage id="Contracts" />,
      type: 'item',
      url: `/client/${clientId}/contracts`
    },
    {
      id: 'Meeting',
      title: <FormattedMessage id="Meeting" />,
      type: 'item',
      url: `/client/${clientId}/meeting`
    },
    // {
    //   id: 'Billing',
    //   title: <FormattedMessage id="Billing" />,
    //   type: 'item',
    //   url: `/client/${clientId}/billing`
    // },
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
      url: `/client/${clientId}/contact-us`
    }
  ]
};
  return dashboard
}

export default sidebarItems;
