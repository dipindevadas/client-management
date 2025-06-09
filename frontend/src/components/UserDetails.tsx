import type { client } from "@/types/Types";

type UsersProps = {
  setViewPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  usersData: Partial<client>;
};
const UserDetails = ({ setViewPopupOpen, usersData }: UsersProps) => {
  return (
    <div>
    
      <div className="bg-[#fafafa] dark:bg-[#192433] p-6 rounded-[20px]">
        <p className="text-[var(--primary)] text-[16px] font-medium">
          User Details
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            User Name :
          </label>

          <p className="text-gray-900 dark:text-white text-[14px] font-medium">
            {usersData.name}
          </p>

          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Adress :
          </label>

          <p className="text-blue-600 text-[14px] font-medium">
            {usersData.email}
          </p>

          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Job :
          </label>

          <p className="text-gray-900 dark:text-white text-[14px] font-medium">
            {usersData.job}
          </p>

          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Salary :
          </label>

          <p className="text-gray-900 dark:text-white text-[14px] font-medium">
            {usersData.rate}
          </p>

          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Salary :
          </label>

          <p className="text-gray-900 dark:text-white text-[14px] font-medium">
            {usersData.isactive ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                Active
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                Inactive
              </span>
            )}
          </p>
        </div>
      </div>

       
       <div className="flex justify-end mt-5">
         <button
          onClick={() => setViewPopupOpen(false)}
          data-modal-hide="popup-modal"
          type="button"
          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
           Close
        </button>
       </div>


    </div>
  );
};

export default UserDetails;
