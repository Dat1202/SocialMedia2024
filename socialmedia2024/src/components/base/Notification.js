import React, { useCallback, useState } from "react";
import ProfileRoute from "./ProfileRoute";
import moment from "moment";
import { authApis, endpoints } from "../../configs/Apis";
import { FriendStatus } from "../../constants/FriendsStatus";
import { NotificationActionType } from "../../constants/NotificationActionType";

const Notifications = ({ notifications, getNotifications }) => {
  console.log(notifications);

  const [loadingUserId, setLoadingUserId] = useState(null);

  const handleConfirm = useCallback(
    async (userId) => {
      setLoadingUserId(userId);
      try {
        const FriendStatusVM = {
          Status: FriendStatus.ACCEPT,
          UserReceivedID: userId,
        };
        await authApis().post(endpoints["friendStatus"], FriendStatusVM);
        getNotifications();
      } finally {
        setLoadingUserId(null);
      }
    },
    [getNotifications]
  );

  const renderNotificationsMessage = (notification) => {
    switch (notification.actionType) {
      case NotificationActionType.POST_REACTED:
        return (
          <p>
            <b>{notification.senderName}</b> {notification.reaction} một bài
            viết của bạn.
          </p>
        );
      case NotificationActionType.REQUEST_SENT:
        return (
          <p>
            <b>{notification.senderName}</b> đã gửi cho bạn một lời mời kết bạn.
          </p>
        );
      case NotificationActionType.REQUEST_ACCEPTED:
        return (
          <p>
            <b>{notification.senderName}</b> đã chấp nhận lời mời kết bạn.
          </p>
        );
      default:
        return (
          <p>
            <b>{notification.senderName}</b> đã thực hiện một hành động.
          </p>
        );
    }
  };

  return (
    <div className="flex flex-wrap">
      {notifications.map((notification, index) => (
        <div
          className={`flex p-2  gap-3 hover:rounded-lg hover:bg-[--hover-color] hover:cursor`}
          key={index}
        >
          <ProfileRoute
            avatar={notification.avatar}
            userId={notification.userId}
          />
          <div>
            {renderNotificationsMessage(notification)}

            <p className="text-sm text-gray-500">
              {moment(notification.createdAt).fromNow()}
            </p>
            <div className="pt-2">
              {notification.actionType === 2 && (
                <div className="flex gap-3 ">
                  <button
                    disabled={loadingUserId === notification.userId}
                    onClick={() => handleConfirm(notification.userId)}
                    className="border bg-[--button-color] 
                                  py-2 px-4 rounded-lg text-white cursor-pointer"
                  >
                    Xác nhận
                  </button>
                  <button
                    className="border bg-[--bg-color] py-2 px-4 rounded-lg 
                                  text-black cursor-pointer"
                  >
                    Từ chối
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
