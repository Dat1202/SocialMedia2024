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

const PostItem = ({ post, postAction }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentAction, setCurrentAction] = useState();
    const [user,] = useContext(UserContext);

    const actions = [
        { id: 1, icon: faThumbsUp, text: 'Thích' },
        { id: '2', icon: faComment, text: 'Bình luận' },
        { id: '3', icon: faShare, text: 'Chia sẻ' }
    ];

    const reactions = [
        { value: 0, name: 'like', icon: '👍', label: 'thích' },
        { value: 1, name: 'like', icon: '👍', label: 'thích' },
        { value: 2, name: 'love', icon: '❤️', label: 'yêu thích' },
        { value: 3, name: 'haha', icon: '😆', label: 'haha' },
        { value: 4, name: 'wow', icon: '😮', label: 'wow' },
        { value: 5, name: 'sad', icon: '😢', label: 'buồn' },
        { value: 6, name: 'angry', icon: '😡', label: 'phẫn nộ' },
    ];

    useEffect(() => {
        const reaction = reactions.find(r => +r.value === +post?.reactionTypeID);
        setCurrentAction(reaction);
    }, [post]);

    const submitReaction = async (reaction) => {
        console.log(reaction)
        if (+currentAction?.value === +reaction.value) {
            setCurrentAction(reactions[0]);

            const postActionVM = {
                ReactionTypeID: 0,
                PostID: +post.id,
                PostUserID: post.postUserId,
            };

            try {
                await authApis().post(endpoints['action'], postActionVM);
            } catch (error) {
                console.error("Error resetting reaction:", error);
            }
        } else {
            setCurrentAction(reaction);

            if (user.id !== post.postUserId) {
                const notificationAction = {
                    senderName: `${user.lastName} ${user.firstName}`,
                    avatar: user.avatar,
                    reaction: reaction.label,
                    postID: post.id,
                    createdAt: moment(),
                    ActionType: 1,
                };
                await sendNotificationToUser("SendNotification", post.postUserId, notificationAction);
            }

            const postActionVM = {
                ReactionTypeID: +reaction.value,
                PostID: +post.id,
                PostUserID: post.postUserId,
            };

            try {
                await authApis().post(endpoints['action'], postActionVM);
            } catch (error) {
                console.error("Error submitting reaction:", error);
            }
        }
    };

    return (
        <div className='bg-white my-3 border border-slate-300 rounded-lg shadow-md'>
            <div className='p-2'>
                <ProfileRoute avatar={post?.avatar} userName={post?.userName} time={post?.createAt} userId={post?.postUserId} />
                <p className='mx-2'>{post?.content}</p>
            </div>
            {/* img */}
            <ImageItem image={post?.postMedias} total={post?.totalCount} />
            {/* action */}
            <div className='relative flex justify-center py-1'>
                {actions.map(action => (
                    <div
                        key={action.text}
                        className='relative flex items-center py-2 px-14 hover:bg-[--hover-color] hover:rounded-xl'
                        onMouseEnter={() => action.id === 1 && setIsHovered(true)}
                        onMouseLeave={() => action.id === 1 && setIsHovered(false)}
                        onClick={() => action.id === 1 && submitReaction(reactions[1])}
                        aria-label={action.text}
                    >
                        <div className='flex items-center gap-1' >
                            {action.id === 1 ? (
                                <div >
                                    <p className={`${currentAction?.value !== 0 ? 'text-red-500' : ''}`}>
                                        {currentAction?.icon} {currentAction?.label}
                                    </p>
                                </div>

                            ) : (
                                <>
                                    <FontAwesomeIcon icon={action.icon} />
                                    <p>{action.text}</p>
                                </>
                            )}

                        </div>

                        {isHovered && action.id === 1 && (
                            <div className="absolute -top-12 -left-10 bg-white border border-gray-200 rounded-lg p-2 shadow-lg">
                                <div className="flex space-x-3">
                                    {reactions.filter(reaction => reaction.value !== 0).map(reaction => (
                                        <div
                                            key={reaction.value}
                                            className="cursor-pointer text-2xl transition transform duration-200 hover:scale-125"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                submitReaction(reaction);
                                            }}
                                            aria-label={reaction.label}
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

export default PostItem;
