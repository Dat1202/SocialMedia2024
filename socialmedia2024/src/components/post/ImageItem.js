import React from 'react'

const ImageItem = ({ image, total }) => {
    return (
        <>
            <div className={`grid ${image.length === 3
                ? (image[0]?.height < image[0]?.width ? 'grid-cols-2' : 'grid-cols-3')
                : 'grid-cols-2'} gap-1 my-2 w-full`}>
                {image.map((md, index) => {
                    let gridClasses = 'cursor-pointer relative';
                    if (image.length === 3 && index === 0) {
                        if (md.height > md.width)
                            gridClasses += ' row-start-1 row-end-3 col-start-1 col-end-3';
                        else
                            gridClasses += ' row-start-1 row-end-1 col-start-1 col-end-3';
                    } else if (image.length === 1) {
                        gridClasses += ' col-span-2';
                    }

                    let overlayClasses = 'absolute top-0 left-0 w-full h-full bg-[--bg-image]	 opacity-80 z-10';

                    return (
                        <React.Fragment key={md.id}>
                            {index < 4 && (
                                <div key={index} className={gridClasses}>
                                    {md.isVideo ? (
                                        <video controls>
                                            <source src={md.mediaUrl} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <img className='max-w-full h-full object-cover' loading='lazy' src={md.mediaUrl} alt="" />
                                    )}
                                    {image.length >= 4 && index === 3 && (
                                        <div className={overlayClasses}>
                                            <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl z-30'> +{total - 4}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </>
    )
}

export default ImageItem
