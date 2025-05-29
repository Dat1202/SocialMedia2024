import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Apis, { endpoints } from "../../configs/Apis";
import { toast } from "react-toastify";
import Spinner from "../base/Spinner";
import React from "react";
import InputField from "../base/InputField";

const RegisterModal = ({ isOpen, onClose }) => {
  const firstInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    sex: true,
    dateOfBirth: moment().format("YYYY-MM-DD"),
  });

  console.log(user)

  const changeUser = useCallback(
    (field) => (e) => {
      setUser((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const changeUserDirect = useCallback((field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      if (user.password !== user.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      setLoading(true);
      try {
        const res = await Apis.post(endpoints["register"], user);
        if (res.success) {
          toast.success(res.messageResponse);
          onClose();
        }
      } catch (error) {
        if (error.response?.data) {
          error.response.data.forEach((err) => {
            toast.error(err.description);
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [user, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <form onSubmit={registerUser}>
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-semibold text-blue-400"
                >
                  Đăng ký
                </DialogTitle>
                <p className="text-sm text-gray-500 mb-3">
                  Nhanh chóng và dễ dàng.
                </p>
                <div className="border-b border-blue-400 mb-4" />

                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <InputField
                      label="Họ"
                      name="firstName"
                      value={user.firstName}
                      onChange={changeUser("firstName")}
                      autoFocus
                      ref={firstInputRef}
                    />
                    <InputField
                      label="Tên"
                      name="lastName"
                      value={user.lastName}
                      onChange={changeUser("lastName")}
                    />
                  </div>

                  <InputField
                    label="Tên đăng nhập"
                    name="username"
                    value={user.username}
                    onChange={changeUser("username")}
                  />

                  <InputField
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={changeUser("password")}
                  />

                  <InputField
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    type="password"
                    value={user.confirmPassword}
                    onChange={changeUser("confirmPassword")}
                  />

                  <div className="flex justify-between gap-4">
                    <div className="w-1/2">
                      <span className="block text-sm font-medium text-slate-700 mb-1">
                        Giới tính *
                      </span>
                      <div className="flex gap-4 items-center">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="sex"
                            checked={user.sex === true}
                            onChange={() => changeUserDirect("sex", true)}
                          />
                          Nam
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="sex"
                            checked={user.sex === false}
                            onChange={() => changeUserDirect("sex", false)}
                          />
                          Nữ
                        </label>
                      </div>
                    </div>

                    <div className="w-1/2">
                      <span className="block text-sm font-medium text-slate-700 mb-1">
                        Ngày sinh *
                      </span>
                      <DatePicker
                        selected={moment(user.dateOfBirth).toDate()}
                        onChange={(date) =>
                          changeUserDirect(
                            "dateOfBirth",
                            moment(date).format("YYYY-MM-DD")
                          )
                        }
                        dateFormat="dd/MM/yyyy"
                        className="border-2 border-slate-300 rounded-md p-2 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {loading ? (
                  <div className="text-end w-full">
                    <Spinner />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md text-white bg-blue-400 
                    hover:text-blue-400 hover:bg-white px-3 py-2 text-sm font-semibold shadow-sm 
                    ring-1 ring-inset ring-gray-300 sm:ml-3 sm:w-auto transition duration-200"
                  >
                    Đăng ký
                  </button>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default React.memo(RegisterModal);
