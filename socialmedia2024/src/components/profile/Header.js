import React, { useCallback, useContext, useEffect, useState } from 'react';
import ModalUploadImage from '../../components/modal/UploadImageModal';
import { useParams } from 'react-router-dom';
import Apis, { authApis, endpoints } from '../../configs/Apis';
import { UserContext } from '../../layout/Router';
import ProfileRoute from '../../components/base/ProfileRoute';
import { faMessage, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { sendNotificationToUser } from '../../service/HubService';

const Header = () => {
    const { userId } = useParams();
    const [currentUser] = useContext(UserContext);
    const [userProfile, setUserProfile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAvatarMenu, setShowAvatarMenu] = useState(false);
    const [friendStatus, setFriendStatus] = useState({});

    const fetchUserData = useCallback(async () => {
        try {
            const { data } = await Apis.get(`${endpoints['profile']}?userId=${userId}`);
            setUserProfile(data);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
    }, [userId]);

    const fetchFriendStatus = useCallback(async () => {
        try {
            const { data } = await authApis().get(endpoints['friendStatus'], { params: { friendId: userId } });
            setFriendStatus(data);
        } catch (error) {
            console.error('Lỗi khi lấy trạng thái bạn bè:', error);
        }
    }, [userId]);

    const handleFriendRequest = async () => {
        try {
            const newStatus = friendStatus.status + 1;
            const friendStatusPayload = { Status: newStatus, UserReceivedID: userId };
            await authApis().post(endpoints['friendStatus'], friendStatusPayload);
            if (newStatus === 1) {
                const notificationPayload = {
                    senderName: `${currentUser.lastName} ${currentUser.firstName}`,
                    avatar: currentUser.avatar,
                    createdAt: moment(),
                    actionType: 2
                };
                await sendNotificationToUser('SendNotification', userId, notificationPayload);
            }
            fetchFriendStatus();
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu kết bạn:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchFriendStatus();
    }, [fetchUserData, fetchFriendStatus]);

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
                        <button onClick={handleFriendRequest} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex gap-2 items-center'>
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span>{friendStatus.friendStatus || 'Kết bạn'}</span>
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

export default React.memo(Header);
