import type { client } from "@/types/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type FormModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDefaultValue?: any;
};

const FormModal = ({ setOpen, isDefaultValue }: FormModalProps) => {
  console.log("desfault value", isDefaultValue);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    job: "",
    rate: 0,
    isactive: true,
  });
  const clientQuery = useQueryClient();

  const createClient = async (data: any) => {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  };

  const editClient = async (data: any) => {
    const response = await axios.put(`${BASE_URL}/${data.id}`, data);
    return response.data;
  };

  const createClientFn = useMutation({
    mutationFn: (formData: Partial<client>) => createClient(formData),
    onSuccess: (data) => {
      clientQuery.invalidateQueries({ queryKey: ["clients"] });
      toast.success(data.message);
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const editClientFn = useMutation({
    mutationFn: (formData: Partial<client>) => editClient(formData),
    onSuccess: (data) => {
      toast.success(data.message || "Client updated successfully");
      clientQuery.invalidateQueries({ queryKey: ["clients"] });
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password)
      return toast.error("All fields are required");

    if (isDefaultValue) {
      editClientFn.mutate(formData);
    } else {
      createClientFn.mutate(formData);
    }
  };

  useEffect(() => {
    if (isDefaultValue) {
      setFormData(isDefaultValue);
    }
    console.log("form data", formData);
  }, [isDefaultValue]);

  return (
    <div>
      <button
        onClick={() => setOpen(false)}
        className="w-8 h-8 bg-[var(--modal-close-btn)] text-[var(--primary)]  rounded-full absolute top-4 right-5  flex items-center justify-center hover:bg-gray-700 hover:text-gray-700"
      >
        ✕
      </button>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid gap-4 mb-4 grid-cols-2 space-y-2">
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter email address"
              required
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="job"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Designation
            </label>
            <input
              type="text"
              name="job"
              id="job"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter Job Title"
              value={formData.job}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, job: e.target.value })
              }
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter password"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="rate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              name="rate"
              id="rate"
              value={formData.rate}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="$2999"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, rate: Number(e.target.value) })
              }
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Status
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={formData.isactive ? "active" : "inactive"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData({
                  ...formData,
                  isactive: e.target.value === "active",
                })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">InActive</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="me-1 -ms-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
         { isDefaultValue ? 'Save': 'Create Client'}
        </button>
      </form>
    </div>
  );
};

export default FormModal;
