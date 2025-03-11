import React, { useState } from "react";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteModal";
const columnMapping = {
  text_mkny3hv7: "First Name",
  text_mknymf5g: "Last Name",
  text_mknyke0r: "Email",
  color_mknx8dmx: "Status",
};

export default function Table({ data = [] }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  return (
    <div className='relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border'>
      <table className='w-full text-left table-auto min-w-max'>
        <thead>
          <tr>
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                {" "}
                Name
              </p>
            </th>
            {Object.values(columnMapping).map((columnName, index) => (
              <th
                key={index}
                className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
                <p className='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                  {columnName}
                </p>
              </th>
            ))}
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className='border-b border-gray-200'>
              <td className='p-4 border-b border-gray-300'>{item.name} </td>
              {Object.keys(columnMapping).map((key) => {
                const column = item.column_values.find((col) => col.id === key);
                return (
                  <td key={key} className='p-4 border-b border-gray-300'>
                    {column ? column.text : "N/A"}
                  </td>
                );
              })}
              <td className='p-4 border-b border-gray-300'>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className='text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md mr-2'>
                  Edit
                </button>
                <button
                  onClick={() => setIsDeleteModal(true)}
                  className='text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md'>
                  Delete
                </button>
              </td>
              <EditUserModal
                data={data[index]}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
              />
              <DeleteUserModal
                id={data[index].id}
                isOpen={isDeleteModal}
                onClose={() => setIsDeleteModal(false)}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
