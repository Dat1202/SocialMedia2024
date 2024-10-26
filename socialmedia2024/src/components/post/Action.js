import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { endpoints, authApis } from '../../configs/Apis';

const Action = ({ postId, postAction }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [fecthAction, ] = useState(postAction?.filter(action => action.postID === postId)[0]);
    const [currentAction, setCurrentAction] = useState();
    console.log("postAction", postId, fecthAction);

    const actions = [
        { icon: faThumbsUp, text: 'Thích' },
        { icon: faComment, text: 'Bình luận' },
        { icon: faShare, text: 'Chia sẻ' }
    ];

    const reactions = [
        { value: '0', name: 'like', icon: '👍', label: 'Like' },
        { value: '1', name: 'like', icon: '👍', label: 'Like' },
        { value: '2', name: 'love', icon: '❤️', label: 'Love' },
        { value: '3', name: 'haha', icon: '😆', label: 'Haha' },
        { value: '4', name: 'wow', icon: '😮', label: 'Wow' },
        { value: '5', name: 'sad', icon: '😢', label: 'Sad' },
        { value: '6', name: 'angry', icon: '😡', label: 'Angry' },
    ];

    useEffect(() => {
        setCurrentAction(reactions.find(reaction => +reaction.value === +fecthAction?.reactionTypeID));
    }, []);

    const submitReaction = async (reaction) => {

        const isSameReaction = +currentAction?.value === +reaction.value;

        const newReaction = isSameReaction ? reactions[0] : reaction;
        setCurrentAction(newReaction);

        const postActionVM = {
            ReactionTypeID: +newReaction.value,
            PostID: +postId
        };

        try {
            await authApis().post(endpoints['action'], postActionVM);
        } catch (error) {
            console.error("Error submitting reaction:", error);
        }
    };

    return (
        <div className='relative flex flex-wrap justify-center gap-2 p-1'>
            {actions.map(action => (
                <div
                    key={action.text}
                    className='relative flex items-center gap-2 py-2 px-14 hover:bg-[--hover-color] hover:rounded-xl'
                    onMouseEnter={() => action.text === 'Thích' && setIsHovered(true)}
                    onMouseLeave={() => action.text === 'Thích' && setIsHovered(false)}
                    aria-label={action.text}
                >
                    <div onClick={() => submitReaction(reactions[1])}>
                        {action.text === 'Thích' ? (
                            currentAction && currentAction.value !== '0' ? (
                                <p className="text-red-500">{currentAction.icon} {currentAction.label}</p>
                            ) : (
                                <p>{reactions[0].icon} {reactions[0].label}</p>
                            )
                        ) : (
                            <FontAwesomeIcon icon={action.icon} />
                        )}
                    </div>

                    {action.text !== 'Thích' ? action.text : ""}

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
