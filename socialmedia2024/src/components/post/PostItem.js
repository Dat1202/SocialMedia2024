import ProfileRoute from '../base/ProfileRoute';
import ImageItem from './ImageItem';
// import Action from './Action';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { endpoints, authApis } from '../../configs/Apis';
import { sendNotificationToUser } from '../../service/HubService';
import { UserContext } from '../../layout/Router';
import moment from 'moment';
import { NotificationActionType } from '../../constants/NotificationActionType';

const reactionsList = [
    { value: 0, name: 'like', icon: '👍', label: 'thích' },
    { value: 1, name: 'like', icon: '👍', label: 'thích' },
    { value: 2, name: 'love', icon: '❤️', label: 'yêu thích' },
    { value: 3, name: 'haha', icon: '😆', label: 'haha' },
    { value: 4, name: 'wow', icon: '😮', label: 'wow' },
    { value: 5, name: 'sad', icon: '😢', label: 'buồn' },
    { value: 6, name: 'angry', icon: '😡', label: 'phẫn nộ' },
];

const actions = [
    { id: 1, icon: faThumbsUp, text: 'Thích' },
    { id: 2, icon: faComment, text: 'Bình luận' },
    { id: 3, icon: faShare, text: 'Chia sẻ' }
];

const PostItem = ({ post, postAction }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentAction, setCurrentAction] = useState(reactionsList[0]);
    const [user] = useContext(UserContext);

    useEffect(() => {
        const reaction = reactionsList.find(r => +r.value === +post?.reactionTypeID) || reactionsList[0];
        setCurrentAction(reaction);
    }, [post]);

    const submitReaction = async (reaction) => {
        try {
            // Nếu reaction giống reaction hiện tại thì bỏ reaction
            if (+currentAction?.value === +reaction.value) {
                setCurrentAction(reactionsList[0]);
                await authApis().post(endpoints['action'], {
                    ReactionTypeID: 0,
                    PostID: +post.id,
                    PostUserID: post.postUserId,
                });
            } else {
                setCurrentAction(reaction);

                if (user.id !== post.postUserId) {
                    const notificationAction = {
                      senderName: `${user.lastName} ${user.firstName}`,
                      avatar: user.avatar,
                      reaction: reaction.label,
                      postID: post.id,
                      createdAt: moment(),
                      ActionType: NotificationActionType.POST_REACTED,
                    };
                    try {
                        await sendNotificationToUser("SendNotification", post.postUserId, notificationAction);
                    } catch (notifyError) {
                        console.error("Error sending notification:", notifyError);
                    }
                }

                await authApis().post(endpoints['action'], {
                    ReactionTypeID: +reaction.value,
                    PostID: +post.id,
                    PostUserID: post.postUserId,
                });
            }
        } catch (error) {
            console.error("Error submitting/resetting reaction:", error);
        }
    };

    return (
        <div className='bg-white my-3 border border-slate-300 rounded-lg shadow-md'>
            <div className='p-2'>
                <ProfileRoute avatar={post?.avatar} userName={post?.userName} time={post?.createdAt} userId={post?.postUserId} />
                <p className='mx-2'>{post?.content}</p>
            </div>
            <ImageItem image={post?.postMedias} total={post?.totalCount} />
            <div className='relative flex justify-center py-1'>
                {actions.map(action => (
                    <div
                        key={action.id}
                        className='relative flex items-center py-2 px-14 hover:bg-[--hover-color] hover:rounded-xl cursor-pointer select-none'
                        onMouseEnter={() => action.id === 1 && setIsHovered(true)}
                        onMouseLeave={() => action.id === 1 && setIsHovered(false)}
                        onClick={() => action.id === 1 && submitReaction(reactionsList[1])} // mặc định nút Thích gửi reaction "like"
                        role="button"
                        tabIndex={0}
                        aria-label={action.text}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                action.id === 1 && submitReaction(reactionsList[1]);
                            }
                        }}
                    >
                        <div className='flex items-center gap-1'>
                            {action.id === 1 ? (
                                <p className={currentAction?.value !== 0 ? 'text-red-500' : ''}>
                                    {currentAction?.icon} {currentAction?.label}
                                </p>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={action.icon} />
                                    <p>{action.text}</p>
                                </>
                            )}
                        </div>

                        {isHovered && action.id === 1 && (
                            <div className="absolute -top-12 -left-10 bg-white border border-gray-200 rounded-lg p-2 shadow-lg z-50">
                                <div className="flex space-x-3">
                                    {reactionsList.filter(r => r.value !== 0).map(reaction => (
                                        <div
                                            key={reaction.value}
                                            className="cursor-pointer text-2xl transition transform duration-200 hover:scale-125"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                submitReaction(reaction);
                                            }}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={reaction.label}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.stopPropagation();
                                                    submitReaction(reaction);
                                                }
                                            }}
                                        >
                                            <span role="img" aria-label={reaction.label}>
                                                {reaction.icon}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(PostItem);
