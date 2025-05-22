import React, { useContext, useEffect, useState } from 'react'
import ModalUploadImage from '../../components/modal/UploadImageModal'
import { useParams } from 'react-router-dom'
import Apis, { authApis, endpoints } from '../../configs/Apis';
import { UserContext } from '../../layout/Router';
import ProfileRoute from '../../components/base/ProfileRoute';
import { faMessage, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { sendNotificationToUser } from '../../service/HubService';

const Profile = () => {
    const { userId } = useParams();
    const [currentUser,] = useContext(UserContext);
    const [userProfile, setUserProfile] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [showAvatar, setShowAvatar] = useState(false);
    const [friendStatus, setFriendStatus] = useState([]);

    useEffect(() => {
        GetUser();
        GetFirendStatus();
    }, [userId]);

    const GetUser = async () => {
        const e = `${endpoints['profile']}?userId=${userId}`;
        const res = await Apis.get(e);
        setUserProfile(res.data)
    }

    const GetFirendStatus = async () => {
        const res = await authApis().get(endpoints['friendStatus'], {
            params: {
                friendId: userId,
            }
        });
        setFriendStatus(res.data);
    }

    const ControllFriend = async (status) => {
        if ((status <= 1 && userId === friendStatus.userSentID) || status === 0) {
            const FriendStatusVM = {
                Status: status + 1,
                UserReceivedID: userId,
            }
            const notificationFriend = {
                senderName: `${currentUser.lastName} ${currentUser.firstName}`,
                avatar: currentUser.avatar,
                createdAt: moment(),
                actionType: 2
            };

            await sendNotificationToUser("SendNotification", userId, notificationFriend);
            await authApis().post(endpoints['friendStatus'], FriendStatusVM);
            GetFirendStatus();
        }

    };

    return (
        <div className='flex justify-center'>
            <div className='w-9/12 border border-black flex justify-between items-center px-8 '>
                <div onClick={() => setShowAvatar(!showAvatar)} className='relative'>
                    <ProfileRoute avatar={userProfile?.avatar} userName={`${userProfile?.lastName} 
                            ${userProfile?.firstName}`} height='h-36' width='w-36' textFont='text-5xl' />
                    {showAvatar && userProfile?.id === currentUser?.id &&
                        <div className='absolute bg-red-100 bg-[--primary-color] p-2 text-black  
                                gap-2 items-center rounded-lg hover:cursor-pointer'>
                            <div className='hover:bg-[--hover-color] rounded-lg p-2 cursor-pointer'
                                onClick={openModal}>Chọn ảnh đại diện</div>
                            <div className='hover:bg-[--hover-color] rounded-lg p-2 cursor-pointer'>Xem ảnh đại diện</div>
                        </div>
                    }
                    <ModalUploadImage isOpen={isModalOpen} onClose={closeModal} user={userProfile} />
                </div>
                <div className='flex justify-between items-center gap-5'>
                    {userProfile?.id !== currentUser?.id &&
                        <>
                            <div onClick={() => ControllFriend(friendStatus.status)} className='bg-[--button-color] p-2 text-white flex gap-2 items-center rounded-lg hover:cursor-pointer'>
                                <FontAwesomeIcon icon={faUserPlus} />
                                <p>{friendStatus.friendStatus}</p>
                            </div>
                            <div className='bg-[--secondary-color] p-2 text-white flex gap-2 items-center rounded-lg'>
                                <FontAwesomeIcon icon={faMessage} />
                                <p>Nhắn tin</p>
                            </div>
                        </>}
                </div>
            </div>
        </div>
    )
}

export default Profile;
