import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../base/Spinner";
import { UserContext } from "../../layout/Router";
import Apis, { endpoints } from "../../configs/Apis";
import cookie from "react-cookies";
import { toast } from "react-toastify";

const UploadImageModal = ({ isOpen, onClose, user }) => {
  const [, dispatch] = useContext(UserContext);

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.avatar) {
      setPreviewImage(user.avatar);
    }
    return () => URL.revokeObjectURL(previewImage);
  }, [user]);

  const handleChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewImage(previewURL);
    }
  };

  const saveImage = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Vui lòng chọn ảnh!");
      return;
    }

    if (!user?.id) {
      toast.error("Thông tin người dùng không hợp lệ!");
      return;
    }

    const data = new FormData();
    data.append("userId", user.id);
    data.append("files", file);

    try {
      setLoading(true);
      const res = await Apis.post(endpoints["uploadAvatar"], data);

      toast.success(res.messageResponse || "Tải ảnh thành công!");
      dispatch({ type: "UPDATE_AVATAR", payload: res.data });

      cookie.save("user", { ...user, avatar: res.data });

      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi khi tải ảnh!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <form onSubmit={saveImage}>
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
            <DialogTitle className="text-2xl font-bold text-blue-500 mb-4 text-center">
              Cập nhật ảnh đại diện
            </DialogTitle>

            <div className="flex flex-col items-center gap-4">
              <label
                htmlFor="uploadImage"
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium rounded-md cursor-pointer transition"
              >
                <FontAwesomeIcon icon={faPlus} />
                Chọn ảnh
              </label>
              <input
                type="file"
                id="uploadImage"
                hidden
                accept="image/*"
                onChange={handleChangeImage}
              />

              <div className="w-full h-72 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Ảnh xem trước"
                    className="max-w-full max-h-full object-contain rounded"
                  />
                ) : (
                  <span className="text-gray-400">Chưa có ảnh được chọn</span>
                )}
              </div>

              <div className="mt-4 flex justify-end w-full">
                {loading ? (
                  <Spinner />
                ) : (
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
                  >
                    Lưu ảnh
                  </button>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </form>
    </Dialog>
  );
};

export default React.memo(UploadImageModal);
