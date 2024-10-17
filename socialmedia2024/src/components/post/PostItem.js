import React from 'react'
import ProfileRoute from '../base/ProfileRoute';

const PostItem = ({ post }) => {
    console.log(post)
    return (
        <>
            <div key={post.id} className='bg-white my-3 border border-slate-300 rounded-lg shadow-md '>
                <div className='p-2' >
                    <ProfileRoute avatar={post?.avatar} userName={post?.username} time={post?.createAt} />
                    <p className='mx-2'>{post.content}</p>
                </div>
                {/* img */}
                <div className={`grid ${post?.postMedias?.length === 3 ?
                    (post?.postMedias[0]?.height < post?.postMedias[0]?.width ? 'grid-cols-2' : 'grid-cols-3')
                    : 'grid-cols-2'} gap-1 my-2 w-full`}>

                    {post?.postMedias?.map((md, index) => {
                        let gridClasses = 'cursor-pointer';

                        if (post.postMedias.length === 3 && index === 0) {
                            if (md.height > md.width)
                                gridClasses += ' row-start-1 row-end-3 col-start-1 col-end-3';
                            else
                                gridClasses += ' row-start-1 row-end-1 col-start-1 col-end-3';
                        } else if (post.postMedias.length === 1) {
                            gridClasses += ' col-span-2';
                        }

                        return (
                            <div key={index} className={gridClasses}>
                                {md.isVideo ? (
                                    <video controls>
                                        <source src={md.mediaUrl} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img className='max-w-full h-full object-cover' loading='lazy' src={md.mediaUrl} alt="" />
                                )}
                            </div>
                        );
                    })}
                </div>


            </div>
        </>
    )
}
export default PostItem;
