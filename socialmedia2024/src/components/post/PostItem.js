import React from 'react';
import ProfileRoute from '../base/ProfileRoute';
import ImageItem from './ImageItem';
import Action from './Action';

const PostItem = ({ post, postAction }) => {
    console.log(post)
    return (
        <div className='bg-white my-3 border border-slate-300 rounded-lg shadow-md'>
            <div className='p-2'>
                <ProfileRoute avatar={post?.avatar} userName={post?.userName} time={post?.createAt} userId={post?.postUserId} />
                <p className='mx-2'>{post?.content}</p>
            </div>
            {/* img */}
            <ImageItem image={post?.postMedias} total={post?.totalCount} />
            <Action post={post} postAction={postAction} />
        </div>
    );
};

export default PostItem;
