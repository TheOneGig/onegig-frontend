import { createNotification } from 'hooks/notifications';
import { useMutation } from 'react-query';

export const Notify = (userId, message) => {
  const { mutate: notify } = useMutation(['notify'], (variables) => createNotification(variables), {
    onSuccess: () => {
      return true;
    }
  });
  const variables = { userId, message };
  return notify({ variables });
};
