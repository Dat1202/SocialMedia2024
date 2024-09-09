import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const Modal = ({ isOpen, onClose }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [currentSelectedMonth, setCurrentSelectedMonth] = useState(startDate.getMonth());
    const [selectedSex, setSelectedSex] = useState('male');

    const handleSexChange = (event) => {
        setSelectedSex(event.target.id);
    };

    const isSameMonth = (month) => {
        return month === currentSelectedMonth;
    };

    const dayClassName = (date) => {
        if (!isSameMonth(date.getMonth())) {
            return "text-white bg-slate-400";
        }
        return "";
    };

    const handleMonthChange = (date) => {
        setCurrentSelectedMonth(date.getMonth());
    };

    const handleClick = (date) => {
        setCurrentSelectedMonth(date.getMonth());
        if (isSameMonth(date.getMonth())) {
            return "text-white bg-slate-400";
        }
        return "";
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-2xl font-semibold leading-6 text-blue-400">
                                        Đăng ký
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Nhanh chóng và dễ dàng.
                                        </p>
                                    </div>

                                    <div className="inline-block border-[1px] justify-center w-full border-blue-400 border-solid"></div>
                                    <form>
                                        <div className='flex flex-col h-96 gap-4 mt-4'>
                                            <div className='flex '>
                                                <label className="block mr-4">
                                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                                        Họ
                                                    </span>
                                                    <input type="text" name="firstName" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Họ" />
                                                </label>

                                                <label className="block">
                                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                                        Tên
                                                    </span>
                                                    <input type="text" name="lastName" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Tên" />
                                                </label>
                                            </div>

                                            <label className="block">
                                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                                    Tên đăng nhập
                                                </span>
                                                <input type="text" name="username" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Số điện thoại hoặc email" />
                                            </label>

                                            <label className="block">
                                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                                    Mật khẩu
                                                </span>
                                                <input type="password" name="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Mật khẩu" />
                                            </label>

                                            <label className="block">
                                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                                    Xác nhận mật khẩu
                                                </span>
                                                <input type="confirmPassword" name="confirmPassword" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Xác nhận mật khẩu" />
                                            </label>

                                            <div className='flex justify-between'>
                                                <label className="block">
                                                    <span className="mb-3 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                                        Giới tính
                                                    </span>
                                                    <fieldset className='mr-3'>
                                                        <input id="male" className="male mr-2" type="radio" name="sex" 
                                                            checked={selectedSex === 'male'}
                                                            onChange={handleSexChange} />
                                                        <label className="mr-6">Nam</label>

                                                        <input id="female" className="female mr-2" type="radio" name="sex" 
                                                            checked={selectedSex === 'female'}
                                                            onChange={handleSexChange} />
                                                        <label className="mr-6">Nữ</label>
                                                    </fieldset>
                                                </label>

                                                <label className="block">
                                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                                        Ngày sinh
                                                    </span>
                                                    <DatePicker className="border-2 border-slate-300 rounded-md p-1 mt-1"
                                                        onChange={(date) => setStartDate(date)} selected={startDate} dateFormat="dd/MM/yyyy"
                                                        dayClassName={dayClassName}
                                                        onMonthChange={handleMonthChange}
                                                        onSelect={handleClick}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                data-autofocus
                                onClick={onClose}
                                className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-blue-400 hover:text-blue-400 hover:bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Save
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default Modal;