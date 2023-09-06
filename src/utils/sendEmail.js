import emailjs from 'emailjs-com';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

export const sendEmailConfirmation = ({ to_name, to_email }) => {
  // Utilizar variables de entorno
  const userId = process.env.REACT_APP_EMAIL_USER_ID;
  const serviceId = process.env.REACT_APP_EMAIL_SERVICE_ID;
  const templateId = process.env.REACT_APP_CONFIRMATION_TEMPLATE_ID;
  // Iniciar emailjs con la variable de entorno
  emailjs.init(userId);

  const templateParams = {
    from_name: 'One Gig',
    to_name: to_name,
    to_email: to_email,
    verify_link: 'https://onegig.netlify.app/new/subscription'
  };

  // Enviar el correo
  emailjs.send(serviceId, templateId, templateParams).then(
    (result) => {
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Email Confirmation Send!',
        message: 'Email Confirmation send to your email, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
    },
    (error) => {
      console.log(error.text);
      alert('Failed to send email');
    }
  );
};

export const sendWorkspaceInvite = ({ to_email, workspaceId }) => {
  // Utilizar variables de entorno
  const userId = process.env.REACT_APP_EMAIL_USER_ID;
  const serviceId = process.env.REACT_APP_EMAIL_SERVICE_ID;
  const templateId = process.env.REACT_APP_INVITE_TEMPLATE_ID;

  // Iniciar emailjs con la variable de entorno
  emailjs.init(userId);

  const templateParams = {
    from_name: 'One Gig',
    to_name: 'there',
    to_email: to_email,
    access_key: workspaceId,
    site_name: 'Workspace',
    site_description: ', participate in the discussions, share documents, and collaborate with the team',
    workspace_link: 'https://onegig.netlify.app/user-register'
  };
  // Enviar el correo
  emailjs.send(serviceId, templateId, templateParams).then(
    (result) => {
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Workspace Invitation Send!',
        message: 'Invitation to join your workspace has been send sucessfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
    },
    (error) => {
      console.log(error.text);
      alert('Failed to send email');
    }
  );
};

export const sendClientInvite = ({ to_name, to_email, clientId }) => {
  // Utilizar variables de entorno
  const userId = process.env.REACT_APP_EMAIL_USER_ID;
  const serviceId = process.env.REACT_APP_EMAIL_SERVICE_ID;
  const templateId = process.env.REACT_APP_CLIENT_INVITE_TEMPLATE_ID;

  // Iniciar emailjs con la variable de entorno
  emailjs.init(userId);

  const templateParams = {
    from_name: 'The One Gig',
    to_name: to_name,
    to_email: to_email,
    site_name: 'Client Portal',
    site_description: ', access your documents, recieve services, and contact support directly',
    workspace_link: 'https://onegig.netlify.app/client/login',
    access_key: clientId
  };

  // Enviar el correo
  emailjs.send(serviceId, templateId, templateParams).then(
    (result) => {
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Client Invitation Send!',
        message: 'Invitation has been send to your client sucessfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
    },
    (error) => {
      console.log(error.text);
      alert('Failed to send email');
    }
  );
};
