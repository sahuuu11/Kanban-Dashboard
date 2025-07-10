import { notification } from 'antd';

export const notificationMessage = (type, message, description = '') => {
  notification[type]({
    message,
    description,
    placement: 'topRight',
  });
};
