import React from 'react'
import NotificationItem from './NotificationItem';

const Notification = ({ notifications, GetNotifications }) => {
  return (
    <>
      <div
        style={{ background: "var(--primary-color)" }}
        className="absolute top-16 right-8 p-2 w-80 rounded-lg border-2"
      >
        <NotificationItem
          notifications={notifications}
          getNotifications={GetNotifications}
        />
      </div>
    </>
  );
};

export default Notification
