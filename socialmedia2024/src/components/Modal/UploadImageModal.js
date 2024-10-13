import React, { useContext, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../base/Spinner';
import { UserContext } from '../../layout/Router';
import Apis, { endpoints } from '../../configs/Apis';
import cookie from "react-cookies";
import { toast } from 'react-toastify';

const UploadImageModal = ({ isOpen, onClose }) => {
    const [user, dispatch] = useContext(UserContext);
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(user?.avatar);
    const [loading, setLoading] = useState(false);
    const saveImage = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("No file selected");
            return;
        }
        if (!user || !user.id) {
            toast.error("User ID is missing");
            return;
        }

        setLoading(true)
        const data = new FormData();
        data.append('userId', user.id);
        data.append('files', file);

        try {
            let res = await Apis.post(endpoints['uploadAvatar'], data);
            toast.success(res.messageResponse)
            dispatch({
                type: 'UPDATE_AVATAR', 
                payload: res.data
            });
            
            cookie.save("user", { ...user, avatar: res.data });
            setLoading(false)
            // onClose();
        } catch (error) {
            console.error("Error uploading image:", error.response?.data || error);
        }
    };

    const handleChangeImage = (e) => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <form onSubmit={saveImage}>
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                />
                <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-9/12"
                        >
                            <div className="bg-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4 ">
                                <div className="">
                                    <div className="mt-3 ml-4 ">
                                        <DialogTitle as="h3" className="text-2xl font-semibold leading-6 text-blue-400">
                                            Chọn ảnh đại diện
                                        </DialogTitle>
                                        <div className="py-4">
                                            <label style={{ background: "var(--secondary-color)" }} className="p-2 rounded-lg" htmlFor="uploadImage">
                                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                                Tải ảnh
                                            </label>
                                            <input type="file" name="" id="uploadImage" hidden onChange={e => handleChangeImage(e)} />
                                        </div>
                                        <div className="w-full h-96 border-2 border-dashed flex items-center justify-center">
                                            <div className="w-full h-full flex items-center justify-center p-2">
                                                <img className="max-w-full max-h-full object-contain" src={previewImage} alt="previewImage" />
                                            </div>
                                        </div>
                                    </div>
                                    {loading ? <div className="text-end mr-4"><Spinner /></div> : <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <input
                                            type="submit"
                                            data-autofocus
                                            className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-blue-400 hover:text-blue-400 hover:bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto transition duration-200 ease-in"
                                            value="Save"
                                        />
                                    </div>}
                                </div>
                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </form>
        </Dialog>
    )
}

export default UploadImageModal;