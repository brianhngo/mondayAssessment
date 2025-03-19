import React, { useState, useMemo, useEffect } from "react";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteModal";
const columnMapping = {
  text_mkny3hv7: "First Name",
  text_mknymf5g: "Last Name",
  text_mknyke0r: "Email",
  color_mknx8dmx: "Status",
};

export default function Table({ data = [], getData }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [originalData, setOriginalData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("None");

  useEffect(() => {
    // Once data passed down from parent component
    if (data.length > 0) {
      setOriginalData(data);
    }
  }, [data]);

  const filteredData = useMemo(() => {
    return filterStatus !== "None"
      ? originalData.filter((item) =>
          item.column_values.some(
            (column) =>
              column.id === "color_mknx8dmx" && column.text === filterStatus
          )
        )
      : originalData;
  }, [originalData, filterStatus]);

  return (
    <div className='relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border'>
      <div className='mb-5'>
        <label
          htmlFor='status'
          className='block mb-2 text-sm font-medium text-gray-900'>
          Filter by Status
        </label>
        <select
          value={filterStatus}
          onChange={(event) => setFilterStatus(event.target.value)}
          id='status'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          required>
          <option disabled>Select a status</option>
          <option value='None' default>
            {" "}
            None{" "}
          </option>
          <option value='Done'>Done</option>
          <option value='Working on it'>Working on it</option>
          <option value='Stuck'>Stuck</option>
        </select>
      </div>

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
          {filteredData.map((item, index) => (
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
                getData={getData}
              />
              <DeleteUserModal
                id={data[index].id}
                isOpen={isDeleteModal}
                onClose={() => setIsDeleteModal(false)}
                getData={getData}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
