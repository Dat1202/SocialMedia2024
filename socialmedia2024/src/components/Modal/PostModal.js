import React, { useContext, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { UserContext } from '../../../Router'
import Spinner from '../../../layout/Spinner'
import ProfileRoute from '../../../base/ProfileRoute'

const PostModal = ({ isOpen, onClose }) => {
    const [user,] = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const createPost = () => {

    }

    const [content, setContent] = useState('');

    const handleInput = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        setContent(e.target.value);
    };
    return (
        <>
            <Dialog open={isOpen} onClose={onClose} className="relative z-10">
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
                                    <ProfileRoute avatar={user?.avatar} userName={user.userName} />
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
                                {loading ? <div className="text-end mr-4"><Spinner /></div> :
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
                </form>
            </Dialog>
        </>
    )
}

export default PostModal
