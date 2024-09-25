import React, { useContext } from 'react'
import { UserContext } from '../../Router';

const ProfileRoute = () => {
    const [user,] = useContext(UserContext);

    return (
        <>
            {user &&
                <div className='flex items-center gap-3 m-2'>
                    <img className="rounded-full w-14 h-14" src={user.avatar} />
                    <p className="capitalize">{user.userName}</p>
                </div>
            }
        </>
    )
}

export default ProfileRoute
