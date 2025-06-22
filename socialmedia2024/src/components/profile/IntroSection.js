import React, { useCallback, useContext, useEffect, useState } from 'react';
import ModalUploadImage from '../modal/UploadImageModal';
import { useParams } from 'react-router-dom';
import Apis, { authApis, endpoints } from '../../configs/Apis';
import { UserContext } from '../../layout/Router';
import ProfileRoute from '../base/ProfileRoute';
import { faMessage, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { sendNotificationToUser } from '../../service/HubService';
import { FriendStatus } from '../../constants/FriendsStatus';
import { NotificationActionType } from '../../constants/NotificationActionType';

const IntroSection = () => {
    const { userId } = useParams();
    const [currentUser] = useContext(UserContext);
    const [userProfile, setUserProfile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAvatarMenu, setShowAvatarMenu] = useState(false);
    const [friendStatus, setFriendStatus] = useState({});

    const getUserData = useCallback(async () => {
        try {
            const { data } = await Apis.get(`${endpoints['profile']}?userId=${userId}`);
            setUserProfile(data);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
    }, [userId]);

    const getFriendStatus = useCallback(async () => {
        try {
            const { data } = await authApis().get(endpoints['friendStatus'], { params: { friendId: userId } });
            setFriendStatus(data);
        } catch (error) {
            console.error('Lỗi khi lấy trạng thái bạn bè:', error);
        }
    }, [userId]);
    
    console.log(friendStatus);

    const sendFriendRequest = async () => {
      if (!friendStatus || friendStatus.status !== FriendStatus.NOT_FRIEND)
        return;

      try {
        const friendStatusPayload = {
          Status: FriendStatus.REQUEST_SENT,
          UserReceivedID: userId,
        };

        await authApis().post(endpoints.friendStatus, friendStatusPayload);

        // Gửi notification khi gửi yêu cầu kết bạn
        const notificationPayload = {
          senderName: `${currentUser.lastName} ${currentUser.firstName}`,
          avatar: currentUser.avatar,
          createdAt: moment(),
          actionType: NotificationActionType.REQUEST_SENT,
          UserId: currentUser.id,
        };

        await sendNotificationToUser("SendNotification", userId, notificationPayload);

        getFriendStatus();
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu kết bạn:", error);
      }
    };

    useEffect(() => {
        getUserData();
        getFriendStatus();
    }, [getUserData, getFriendStatus]);

    return (
        <div className='flex justify-center'>
            <div className='w-9/12 border border-black flex justify-between items-center px-8 py-4 rounded-lg bg-white shadow-md'>
                <div onClick={() => setShowAvatarMenu(!showAvatarMenu)} className='relative cursor-pointer'>
                    <ProfileRoute avatar={userProfile?.avatar} userName={`${userProfile?.lastName} ${userProfile?.firstName}`} height='h-36' width='w-36' textFont='text-5xl' />
                    {showAvatarMenu && userProfile?.id === currentUser?.id && (
                        <div className='absolute bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-50 gap-2 items-center cursor-pointer'>
                            <div className='hover:bg-gray-100 rounded-lg p-2' onClick={() => setIsModalOpen(true)}>Chọn ảnh đại diện</div>
                            <div className='hover:bg-gray-100 rounded-lg p-2'>Xem ảnh đại diện</div>
                        </div>
                    )}
                </div>
                <ModalUploadImage isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={userProfile} />
                {userProfile?.id !== currentUser?.id && (
                    <div className='flex gap-4'>

                        <button onClick={sendFriendRequest} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex gap-2 items-center'>
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span>{ friendStatus.friendStatus }</span>
                        </button>

                        <button className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex gap-2 items-center'>
                            <FontAwesomeIcon icon={faMessage} />
                            <span>Nhắn tin</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(IntroSection);
