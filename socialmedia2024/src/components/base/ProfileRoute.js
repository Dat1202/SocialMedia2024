import React from 'react'
import { Link } from 'react-router-dom';

const ProfileRoute = ({ avatar, userName }) => {

    return (
        <>
            <Link to="/profile">
                <div className='flex items-center gap-3 m-2'>
                    <img className="rounded-full w-12 h-12" src={avatar} alt='' />
                    {userName && <p className="capitalize">{userName}</p>}
                </div>
            </Link>
        </>
    )
}

export default ProfileRoute
