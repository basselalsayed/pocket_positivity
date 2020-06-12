import React from 'react';

const NotificationsContext = React.createContext(null);

export const withNotifications = Component => props => {
  <NotificationsContext.Consumer>
    {notification => <Component {...props} notification={notification} />}
  </NotificationsContext.Consumer>;
};

export default withNotifications;
