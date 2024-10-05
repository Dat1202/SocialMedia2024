import React, { useContext, useState } from 'react'
import { UserContext } from '../../Router';
import ProfileRoute from '../Profile/ProfileRoute';

const Post = () => {
    const [user, dispatch] = useContext(UserContext);
    const [content, setContent] = useState("")

    return ( 
        <>
            <div className='bg-white text-black py-2 px-4 flex items-center gap-2 border border-slate-400 rounded-lg shadow-md '>
                <ProfileRoute avatar={user?.avatar}/>
                <input type='text' value={content} className='w-11/12 px-4 py-2 rounded-full' style={{ background: "var(--bg-color)" }} placeholder="123-45-678" />
            </div>
        </>
    )
}

export default Post;
