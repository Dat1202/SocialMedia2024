import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';

const ProfileRoute = ({ avatar, userName, time, userId, height, width, link, textFont }) => {
    const profileLink = link || (userId ? `/profile/${userId}` : '#');

    return (
        <>
            <Link to={profileLink}>
                <div className='flex items-center gap-2 m-2 cursor-pointer'>
                <img className={`rounded-full ${height || 'h-11'} ${width || 'w-11'} object-cover`}
                     src={avatar || '/default-avatar.png'}
                     alt={`${userName || 'User'} avatar`}
                    />                    
                    <div>
                        <p className={`capitalize ${textFont || ''}`}>{userName}</p>
                        {time && <p title={moment(time).format('LLLL')} className="hover:underline">{moment(time, "YYYY-MM-DD HH:mm:ss").fromNow()}</p>}
                    </div>
                </div>
            </Link>
        </>
    );
}

export default ProfileRoute;
