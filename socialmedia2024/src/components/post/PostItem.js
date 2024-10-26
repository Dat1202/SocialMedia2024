import React, { useEffect, useState } from 'react';
import ProfileRoute from '../base/ProfileRoute';
import ImageItem from './ImageItem';
import Action from './Action';

const PostItem = ({ post, postAction }) => {

    return (
        <div className='bg-white my-3 border border-slate-300 rounded-lg shadow-md'>
            <div className='p-2'>
                <ProfileRoute avatar={post?.avatar} userName={post?.username} time={post?.createAt} />
                <p className='mx-2'>{post?.content}</p>
            </div>
            {/* img */}
            <ImageItem image={post?.postMedias} total={post?.totalCount} />
            <Action postId={post.id} postAction={postAction} />
        </div>
    );
};

export default PostItem;
