
import { Button } from "./button";
import type { client } from "@/types/Types";

import { useState } from "react";
import Modal from "../common/Modal";
import FormModal from "../common/FormModal";
import DeleteModal from "../common/DeleteModal";
import UserDetails from "../UserDetails";

type TableProps = {
  data: client[];
};

export function TableDemo({ data }: TableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [clientId, setClientId] = useState<string | number | null>(null);
  const [selectedClient, setSelectedClient] = useState<client | null>(null);

  return (
    <div>
      <div className="relative  overflow-x-auto flex justify-center  ">
        <table className="w-7/8 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md sm:rounded-[20px] ">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Email Adress
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Job
              </th>
              <th scope="col" className="px-6 py-3">
                Rate
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((client) => (
              <tr 
                key={client.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 hover:dark:bg-gray-800"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  {client.id}
                </td>
                <td className="px-6 py-4 font-medium">{client.name}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-[var(--email-color)]">
                  {client.email}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-[var(--email-color)]">
                  {client.job}
                </td>
                <td className="px-6 py-4">{client.rate}</td>
                <td className="px-6 py-4">
                  {client.isactive ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <Button  onClick={() => {
                      setSelectedClient(client);
                      setViewPopupOpen(true);
                    }} className="">View</Button>
                  <Button
                    onClick={() => {
                      setSelectedClient(client);
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setDeletePopupOpen(true);
                      setClientId(client.id);
                    }}
                    className="bg-red-600 text-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <Modal setOpen={setIsOpen}>
          <FormModal setOpen={setIsOpen} isDefaultValue={selectedClient} />
        </Modal>
      )}

      {deletePopupOpen && (
        <Modal setDeletePopupOpen={setDeletePopupOpen}>
          <DeleteModal setDeletePopupOpen={setDeletePopupOpen} clientId={clientId} />
        </Modal>
      )}

      {
        viewPopupOpen && (
          <Modal setViewPopupOpen={setViewPopupOpen}>
            {selectedClient && <UserDetails setViewPopupOpen={setViewPopupOpen} usersData={selectedClient} />}
          </Modal>
        )
      }
    </div>
  );
}
