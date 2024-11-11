import React, { useContext, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { UserContext } from '../../layout/Router'
import Spinner from '../base/Spinner'
import ProfileRoute from '../base/ProfileRoute'
import { endpoints, authApis } from '../../configs/Apis';
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage, faImage } from '@fortawesome/free-regular-svg-icons'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const PostModal = ({ isOpen, onClose, GetListPost }) => {
    const [user,] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [files, setFile] = useState([]);
    const [isOpenAddImage, setOpenAddImage] = useState(false);

    const createPost = async (e) => {
        e.preventDefault();

        if (content === "" && files.length === 0) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);
        const data = new FormData();

        data.append("UserId", user.id)
        data.append("Content", content)
        if (files && files.length > 0) {
            files.forEach((file) => {
                data.append("Files", file);
            });
        }

        try {
            let post = await authApis().post(endpoints['post'], data);
            toast.success(post.data.messageResponse);
            onClose();
            setContent('');
            setFile([]);
            setLoading(false);
            setPreviewImage(null);
            GetListPost();
        }
        catch (ex) {
            console.log(ex);
        }
    }
    const handleInput = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        setContent(e.target.value);
    };

    useEffect(() => {
        console.log("Updated previewImage:", previewImage);
    }, [previewImage]);

    const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files);
        const newPreviewImages = filesArray.map(file => URL.createObjectURL(file));

        setPreviewImage(newPreviewImages);
        // console.log("previewImage", previewImage)

        setFile([...files, ...e.target.files]);
    }

    const openAddImage = () => {
        setOpenAddImage(!isOpenAddImage);
    }
    const DeletePreviewImage = () => {
        setPreviewImage(null);
        setFile([]);
    }

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} className="relative z-50">
                <form onSubmit={createPost}>
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-2/6">
                                <div className="bg-white pt-4 border-b-2 w-full border-solid">
                                    <div className="mt-3 text-center ">
                                        <DialogTitle as="h3" className="text-2xl font-semibold leading-6">
                                            Tạo bài viết
                                        </DialogTitle>
                                        <div className="inline-block"></div>
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <ProfileRoute avatar={user?.avatar} userName={`${user?.lastName} ${user?.firstName}`} userId={user?.id} />
                                </div>
                                <div className='text-left w-full'>
                                    <textarea
                                        className="w-full focus:outline-none p-4 resize-none overflow-hidden"
                                        rows="1"
                                        value={content}
                                        onInput={handleInput}
                                        placeholder="Nhập nội dung ở đây..."
                                    />
                                </div>


                                {isOpenAddImage && (previewImage === null ?
                                    <div className='border border-black p-2 m-2'>
                                        <label htmlFor="uploadImage" className='cursor-pointer' >
                                            <div className='text-2xl bg-[var(--secondary-color)] hover:bg-[var(--hover-color)] p-28'>
                                                <FontAwesomeIcon icon={faFileImage} />
                                            </div>
                                        </label>
                                    </div> :
                                    <>
                                        <div className='h-72 relative overflow-hidden' >
                                            <PerfectScrollbar>  
                                                <div className={`${previewImage.length > 2 ? 'grid grid-cols-2 gap-1 px-1' : ''} `} >
                                                    {previewImage.map((image, index) => (
                                                        <div key={index}>
                                                            <img className='max-full h-auto object-cover' src={image} alt=''/>
                                                        </div>
                                                    ))}
                                                </div>

                                            </PerfectScrollbar>
                                            <div onClick={DeletePreviewImage} className='absolute top-2 right-4 z-30 bg-slate-100 border rounded-full p-2'>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div>
                                    <input id="uploadImage" hidden type="file" multiple onChange={e => handleFileChange(e)} />
                                </div>

                                <div className='cursor-pointer' onClick={openAddImage}>
                                    <FontAwesomeIcon className='text-green-400' icon={faImage} />
                                </div>

                                {loading ? <div className="text-center mr-4"><Spinner /></div> :
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6">
                                        <input
                                            type="submit"
                                            data-autofocus
                                            className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-blue-400 hover:text-blue-400 hover:bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 transition duration-200 ease-in"
                                            value="Đăng"
                                        />
                                    </div>}
                            </DialogPanel>
                        </div>
                    </div>
                </form >
            </Dialog >
        </>
    )
}

export default PostModal
