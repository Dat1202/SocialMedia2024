import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';
const ProfileRoute = ({ avatar, userName, time }) => {
    return (
        <>
            <Link to="/profile">
                <div className='flex items-center gap-3 m-2 cursor-pointer'>
                    <img className="rounded-full w-12 h-12" src={avatar} alt='' />
                    <div>
                        {userName && <p className="capitalize">{userName}</p>}
                        {time && <p title={moment(time).format('LLLL')} className="hover:underline">{moment(time,"DDMMYYYY HH:mm:ss").fromNow()}</p>} {/* Corrected here */}
                    </div>
                </div>
            </Link>
        </>
    );
}

export default ProfileRoute;
