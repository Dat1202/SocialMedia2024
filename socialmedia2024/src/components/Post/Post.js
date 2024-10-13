import React, { useContext, useState } from 'react'
import { UserContext } from '../../layout/Router';
import ProfileRoute from '../base/ProfileRoute';
import PostModal from '../modal/PostModal';

const Post = () => {
    const [user, dispatch] = useContext(UserContext);
    const [content, setContent] = useState("")
    const [isOpenPostModal, setIsOpenPostModal] = useState(false);

    const openPostModal = () => setIsOpenPostModal(true);
    const closePostModal = () => setIsOpenPostModal(false);
    return ( 
        <>
            <div className='bg-white text-black py-2 px-4 flex items-center gap-2 border border-slate-400 rounded-lg shadow-md '>
                <ProfileRoute avatar={user?.avatar}/>
                <input type='text' value={content} className='w-11/12 px-4 py-2 rounded-full caret-transparent focus:outline-none' onClick={openPostModal} style={{ background: "var(--bg-color)" }} placeholder="123-45-678" />
            </div>

            <PostModal isOpen={isOpenPostModal} onClose={closePostModal} />
            <div className='bg-white p-2 my-3'>
                <div >
                    <ProfileRoute avatar={user?.avatar} userName={user?.userName} time="12-10-2024 00:10:20 "/>
                </div>
                {/* content */}
                <div>
                    <p>ssssssssssssssssssssssssssssss</p>
                </div>
                {/* img */}
                <div className='grid grid-cols-2 gap-1 my-3'>
                    <div className='cursor-pointer'><img className='max-w-full h-auto object-cover' src="http://res.cloudinary.com/djmvq0myz/image/upload/v1728157095/mrghlkcjyh3nd4mnxqp6.jpg" alt="" /></div>
                    <div className=''><img className='max-w-full h-auto of' src="http://res.cloudinary.com/djmvq0myz/image/upload/v1728157095/mrghlkcjyh3nd4mnxqp6.jpg" alt="" /></div>
                    <div className=''><img className='max-w-full h-auto' src="http://res.cloudinary.com/djmvq0myz/image/upload/v1728157095/mrghlkcjyh3nd4mnxqp6.jpg" alt="" /></div>
                    <div className=''><img className='max-w-full h-auto' src="http://res.cloudinary.com/djmvq0myz/image/upload/v1728744452/duups9fxicqemkjz08ym.jpg" alt="" /></div>
                </div>
            </div>
            
        </>
    )
}

export default Post;
