import React from "react";

export default function Table() {
  return (
    <div className='relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border'>
      <table className='w-full text-left table-auto min-w-max'>
        <thead>
          <tr>
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                Email
              </p>
            </th>
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                First Name
              </p>
            </th>
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                Last Name
              </p>
            </th>
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                Status
              </p>
            </th>
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'></p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='p-4 border-b border-blue-gray-50'>
              <p className='block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                John@mail.com
              </p>
            </td>
            <td className='p-4 border-b border-blue-gray-50'>
              <p className='block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                John
              </p>
            </td>
            <td className='p-4 border-b border-blue-gray-50'>
              <p className='block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                Smith
              </p>
            </td>
            <td className='p-4 border-b border-blue-gray-50'>
              <a
                href='#'
                className='block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900'>
                Active
              </a>
            </td>
            <td className='p-4 border-b border-blue-gray-50'>
              <button
                href='#'
                className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                {" "}
                Edit{" "}
              </button>
              <button
                href='#'
                className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                {" "}
                Delete{" "}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
