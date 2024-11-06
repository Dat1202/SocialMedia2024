import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { endpoints, authApis } from '../../configs/Apis';
import { sendNotificationToUser } from '../../service/HubService';
import { UserContext } from '../../layout/Router';
import moment from 'moment';

const Action = ({ post, postAction }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [fecthAction,] = useState(postAction?.filter(action => action.postID === post.id)[0]);
    const [currentAction, setCurrentAction] = useState();
    const [user,] = useContext(UserContext);

    const actions = [
        { icon: faThumbsUp, text: 'Thích' },
        { icon: faComment, text: 'Bình luận' },
        { icon: faShare, text: 'Chia sẻ' }
    ];

    const reactions = [
        { value: '0', name: 'like', icon: '👍', label: 'thích' },
        { value: '1', name: 'like', icon: '👍', label: 'thích' },
        { value: '2', name: 'love', icon: '❤️', label: 'yêu thích' },
        { value: '3', name: 'haha', icon: '😆', label: 'haha' },
        { value: '4', name: 'wow', icon: '😮', label: 'wow' },
        { value: '5', name: 'sad', icon: '😢', label: 'buồn' },
        { value: '6', name: 'angry', icon: '😡', label: 'phẫn nộ' },
    ];

    useEffect(() => {
        setCurrentAction(reactions.find(reaction => +reaction.value === +fecthAction?.reactionTypeID));
    }, []);

    const submitReaction = async (reaction) => {
        if (+currentAction?.value === +reaction.value) {
            setCurrentAction(reactions[0]);
        }
        else {
            setCurrentAction(reaction);
            if (user.id !== post.postUserId) {
                const notificationAction = {
                    senderName: `${user.lastName} ${user.firstName}`,
                    avatar: user.avatar,
                    reaction: reaction.label,
                    postID: post.id,
                    createdAt: moment(),
                    ActionType: 1
                };
                await sendNotificationToUser("SendNotificationActionToUser", post.postUserId, notificationAction);
            }
        }

        const postActionVM = {
            ReactionTypeID: +reaction.value,
            PostID: +post.id
        };

        try {
            await authApis().post(endpoints['action'], postActionVM);
        } catch (error) {
            console.error("Error submitting reaction:", error);
        }
    };

    return (
        <div className='relative flex justify-center py-1'>
            {actions.map(action => (
                <div
                    key={action.text}
                    className='relative flex items-center py-2 px-14 hover:bg-[--hover-color] hover:rounded-xl'
                    onMouseEnter={() => action.text === 'Thích' && setIsHovered(true)}
                    onMouseLeave={() => action.text === 'Thích' && setIsHovered(false)}
                    aria-label={action.text}
                >
                    <div className='flex items-center gap-1' onClick={() => submitReaction(reactions[1])}>
                        {action.text === 'Thích' ? (
                            currentAction && currentAction.value !== '0' ? (
                                <p className="text-red-500">{currentAction.icon} {currentAction.label}</p>
                            ) : (
                                <p>{reactions[0].icon} {reactions[0].label}</p>
                            )
                        ) : (
                            <>
                                <FontAwesomeIcon icon={action.icon} />
                                <p>{action.text !== 'Thích' ? action.text : ""}</p>
                            </>
                        )}
                    </div>

                    {isHovered && action.text === 'Thích' && (
                        <div className="absolute -top-12 -left-10 bg-white border border-gray-200 rounded-lg p-2 shadow-lg">
                            <div className="flex space-x-3">
                                {reactions
                                    .filter(reaction => reaction.value !== '0')
                                    .map(reaction => (
                                        <div
                                            key={reaction.value}
                                            className="cursor-pointer text-2xl transition transform duration-200 hover:scale-125"
                                            onClick={() => submitReaction(reaction)}
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
    );
};

export default Action;
