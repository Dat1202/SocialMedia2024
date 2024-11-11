import React from 'react';
import ProfileRoute from './ProfileRoute';
import moment from 'moment';
import { authApis, endpoints } from '../../configs/Apis';

const Notification = ({ notification, getNotifications }) => {
  console.log(notification);

  const handleConfirm = async (userId) => {
    const FriendStatusVM = {
      Status: 2,
      UserReceivedID: userId,
    }
    await authApis().post(endpoints['friendStatus'], FriendStatusVM);
    getNotifications();
  };

  return (
    <div className='flex flex-wrap'>
      {notification.map((note, index) => (
        <div className={`flex p-2  hover:rounded-lg hover:bg-[--hover-color] hover:cursor`} key={index}>
          <div>
            <ProfileRoute avatar={note.avatar} userId={note.userId} />
          </div>
          <div>
            {note.actionType === 1 ? (
              <p>
                <b>{note.senderName} </b> {note.reaction} một bài viết của bạn.
              </p>
            ) : note.actionType === 2 ? (
              <p>
                <b>{note.senderName} </b> đã gửi cho bạn một lời mời kết bạn.
              </p>
            ) : note.actionType === 3 ? (
              <p>
                <b>{note.senderName} </b> đã chấp nhận lời mời kết bạn.
              </p>
            )
              : (
                <p>Thông báo không xác định.</p>
              )}
            <p className='text-sm'>{moment(note.createdAt).fromNow()}</p>
            <div className='pt-2'>
              {note.actionType === 2 &&
                <div className='flex gap-3 '>
                  <div onClick={() => handleConfirm(note.userId)} className='border bg-[--button-color] py-2 px-4 rounded-lg text-white cursor-pointer'>Xác nhận</div>
                  <div className='border bg-[--bg-color] py-2 px-4 rounded-lg text-black cursor-pointer'>Từ chối</div>
                </div>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
