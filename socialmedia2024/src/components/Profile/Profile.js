import React, { useState } from 'react'
import ModalUploadImage from './ModalUploadImage'

const Profile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <p onClick={openModal}>Chọn ảnh đại diện</p>
            <ModalUploadImage isOpen={isModalOpen} onClose={closeModal} />
        </>
    )
}

export default Profile
