import React from "react";

type ModalProps = {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  setDeletePopupOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setViewPopupOpen?: React.Dispatch<React.SetStateAction<boolean>>;

};

const Modal = ({ children }: ModalProps) => {
  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.63)] bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg p-8 relative">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
