import React, { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../layout/Router';
import ProfileRoute from '../base/ProfileRoute';
import PostModal from '../modal/PostModal';
import { authApis, endpoints } from '../../configs/Apis';
import Spinner from '../base/Spinner';
import PostItem from './PostItem';

const Post = () => {
    const [user] = useContext(UserContext);
    const [isOpenPostModal, setIsOpenPostModal] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postAction, setPostAction] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const openPostModal = () => setIsOpenPostModal(true);
    const closePostModal = () => setIsOpenPostModal(false);

    const GetReaction = useCallback(async () => {
        try {
            const res = await authApis().get(endpoints['action']);
            setPostAction(res.data);
        } catch (error) {
            console.error("Error fetching reactions:", error);
        }
    }, []);

    const GetListPost = useCallback(async (currentPageIndex) => {
        setLoading(true);
        try {
            const res = await authApis().get(endpoints['post'], {
                params: { page: currentPageIndex }
            });
            setPosts((prevPosts) =>
                currentPageIndex === 1 ? res.data : [...prevPosts, ...res.data]
            );
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
            if (initialLoad) setInitialLoad(false);
        }
    }, [initialLoad]);

    useEffect(() => {
        GetReaction();
        GetListPost(1);
    }, [GetReaction, GetListPost]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10 &&
            !loading &&
            !initialLoad
        ) {
            setPageIndex((prevIndex) => prevIndex + 1);
        }
    }, [loading, initialLoad]);

    useEffect(() => {
        if (!initialLoad && pageIndex > 1) {
            GetListPost(pageIndex);
        }
    }, [pageIndex, initialLoad, GetListPost]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (posts.length === 0 && loading) return <Spinner />;

    return (
        <>
            <div className='bg-white text-black py-2 px-4 flex items-center gap-2 border border-slate-400 rounded-lg shadow-md '>
                <ProfileRoute avatar={user?.avatar} />
                <input type='text' onClick={openPostModal} placeholder={`${user.firstName} ơi, Bạn đang nghĩ gì thế?`}
                    className='w-11/12 px-4 py-2 rounded-full caret-transparent focus:outline-none hover:cursor-pointer bg-[var(--bg-color)] hover:bg-[var(--hover-color)]' />
            </div>
            <PostModal GetListPost={() => GetListPost(1)} isOpen={isOpenPostModal} onClose={closePostModal} />

            {posts.length > 0 ? posts.map(p => (
                <PostItem key={p.id} post={p} postAction={postAction} />
            )) : <h1>Bạn chưa có bài viết, hãy kết bạn thêm</h1>}

            {loading && <Spinner />}
        </>
    );
}

export default Post;
