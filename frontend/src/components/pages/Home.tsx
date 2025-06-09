import { TableDemo } from "../ui/TableDemo";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import type { client } from "@/types/Types";
import Filters from "../Filters";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LIMIT = 10;

export const Home = () => {
  // Fetch paginated clients
  const fetchClients = async ({ pageParam = 1 }) => {
    const response = await axios.get<{
      message: string;
      data: client[];
      page: number;
      totalPages: number;
    }>(`${BASE_URL}?page=${pageParam}&limit=${LIMIT}`);

    return {
      data: response.data.data,
      currentPage: response.data.page,
      totalPages: response.data.totalPages,
      nextPage: response.data.page + 1,
    };
  };

  // React Query useInfiniteQuery hook
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.nextPage
        : undefined;
    },
  });

  // Combine all pages' data
  const allClients = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="p-6 flex flex-col gap-6">
     

      {isLoading && <p>Loading...</p>}
      {isError && <p>{(error as Error).message}</p>}

      <Filters />

      {allClients.length > 0 && <TableDemo data={allClients} />}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
            ? "Load More"
            : "No more data"}
        </button>
      </div>
    </div>
  );
};

// import { TableDemo } from "../ui/TableDemo";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import type { client } from "@/types/Types";
// import toast from "react-hot-toast";
// import Filters from "../Filters";
// import { useState, useEffect } from "react";

// export const Home = () => {
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   const [filters, setFilters] = useState({
//     name: "",
//     email: "",
//     isactive: "",
//     sortOrder: "desc", // "asc" or "desc"
//     sortBy: "created_at",
//   });

//   const fetchClients = async () => {
//     const params = new URLSearchParams();
//     if (filters.name) params.append("name", filters.name);
//     if (filters.email) params.append("email", filters.email);
//     if (filters.isactive !== "") params.append("isactive", filters.isactive);
//     params.append("sortOrder", filters.sortOrder);
//     params.append("sortBy", filters.sortBy);
//     params.append("limit", "100"); // adjust as needed
//     params.append("page", "1");

//     const response = await axios.get<{ message: string; data: client[] }>(
//       `${BASE_URL}?${params.toString()}`
//     );
//     toast.success(response.data.message);
//     return response.data.data;
//   };

//   const { data, isLoading, isError, refetch } = useQuery({
//     queryKey: ["clients", filters],
//     queryFn: fetchClients,

//   });

//   useEffect(() => {
//     refetch();
//   }, [filters]);

//   return (
//     <div className="p-6 flex flex-col gap-6">
//       <div className="w-full flex justify-center">
//         <p className="w-7/8 flex justify-start text-[var(--primary)] font-bold text-[20px]">
//           User Management System
//         </p>
//       </div>

//       <Filters filters={filters} setFilters={setFilters} />

//       {isLoading && <p>Loading...</p>}
//       {isError && <p>Error loading clients</p>}

//       {data && <TableDemo data={data} />}
//     </div>
//   );
// };
