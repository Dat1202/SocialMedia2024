import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../layout/Router';
import ProfileRoute from '../base/ProfileRoute';
import PostModal from '../modal/PostModal';
import { authApis, endpoints } from '../../configs/Apis';
import Spinner from '../base/Spinner';
import PostItem from './PostItem';

const Post = () => {
    const [user,] = useContext(UserContext);
    const [isOpenPostModal, setIsOpenPostModal] = useState(false);
    const [post, setPost] = useState(null);
    const [postAction, setPostAction] = useState([])
    const openPostModal = () => setIsOpenPostModal(true);
    const closePostModal = () => setIsOpenPostModal(false);

    useEffect(() => {
        GetListPost();  
        GetReaction();

    }, []);

    const GetReaction = async () => {
        try {
            const res = await authApis().get(endpoints['action']);
            setPostAction(res.data);
        } catch (error) {
            console.error("Error fetching reactions:", error);
        }
    };

    const GetListPost = async () => {
        const posts = await authApis().get(endpoints['post']);
        setPost(posts);
    }
    console.log("Rendering post with ID:", post);

    if (post === null) return <Spinner />;

    return (
        <>
            <div className='bg-white text-black py-2 px-4 flex items-center gap-2 border border-slate-400 rounded-lg shadow-md '>
                <ProfileRoute avatar={user?.avatar} />
                <input type='text' onClick={openPostModal} placeholder={`${user.firstName} ơi, Bạn đang nghĩ gì thế?`}
                    className='w-11/12 px-4 py-2 rounded-full caret-transparent focus:outline-none hover:cursor-pointer bg-[var(--bg-color)] hover:bg-[var(--hover-color)]' />
            </div>
            <PostModal GetListPost={GetListPost} isOpen={isOpenPostModal} onClose={closePostModal} />

            {post && post.data.length > 0 ? post.data.map(p => (
                <PostItem key={p.id} post={p} postAction={postAction} />
            )) : <h1>Bạn chưa có bài viết, hãy kết bạn thêm</h1>}
        </>
    )
}

export default Post;
