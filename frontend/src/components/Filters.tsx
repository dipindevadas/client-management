import  { useState } from "react";
import { Button } from "./ui/button";
import FormModal from "./common/FormModal";
import Modal from "./common/Modal";

// type FilterProps = {
//   filters: any;
//   setFilters: React.Dispatch<React.SetStateAction<any>>;
// };

const Filters = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-7/8 div flex justify-between items-center gap-4 py-3">
        {/* <div className="flex gap-4 flex-wrap items-center mb-4">
          <input
            type="text"
            placeholder="Search by Name"
            value={filters.name}
            onChange={(e) =>
              setFilters((prev: any) => ({ ...prev, name: e.target.value }))
            }
            className="border px-3 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Search by Email"
            value={filters.email}
            onChange={(e) =>
              setFilters((prev: any) => ({ ...prev, email: e.target.value }))
            }
            className="border px-3 py-1 rounded"
          />
          <select
            value={filters.sortOrder}
            onChange={(e) =>
              setFilters((prev: any) => ({
                ...prev,
                sortOrder: e.target.value,
              }))
            }
            className="border px-2 py-1 rounded"
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
          <select
            value={filters.isactive}
            onChange={(e) =>
              setFilters((prev: any) => ({ ...prev, isactive: e.target.value }))
            }
            className="border px-2 py-1 rounded"
          >
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div> */}

         <p className=" flex justify-start text-[var(--primary)] font-bold text-[20px]">
          User Management System
        </p>
       
        <Button
          onClick={() => setOpen(true)}
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
             <svg
            className=" -ms-1 w-5 h-5"
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
          Create User
        </Button>
        {open && (
          <Modal setOpen={setOpen}>
            <FormModal setOpen={setOpen} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Filters;
