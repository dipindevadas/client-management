import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

type DeleteProps = {
  setDeletePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clientId: string | number | null;
};
const DeleteModal = ({ setDeletePopupOpen, clientId }: DeleteProps) => {

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const queryClient = useQueryClient()

  const deleteClientFn = async (id: any) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  };

  const deleteClient = useMutation({
    mutationFn: (id: string | number | null) => deleteClientFn(id),
    onSuccess:(data)=>{
     queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success(data.message || "Client Deleted successfully");

      setDeletePopupOpen(false);
    },
    onError:(error:any)=>{
      toast.error(error.message);
    }
  })

  const handleDelete = (id: string | number | null) => {
    deleteClient.mutate(id);
  }

  return (
    <>
      <button
          onClick={() => setDeletePopupOpen(false)}
        className="w-8 h-8 bg-[var(--modal-close-btn)] text-[var(--primary)]  rounded-full absolute top-4 right-5  flex items-center justify-center hover:bg-gray-700 hover:text-gray-700"
      >
        ✕
      </button>

      <div className="p-4 md:p-5 text-center">
        <svg
          className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this product?
        </h3>
        <button
          onClick={()=>handleDelete(clientId)}
          data-modal-hide="popup-modal"
          type="button"
          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
        >
          Yes, I'm sure
        </button>
        <button
          onClick={() => setDeletePopupOpen(false)}
          data-modal-hide="popup-modal"
          type="button"
          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          No, cancel
        </button>
      </div>
    </>
  );
};

export default DeleteModal;
