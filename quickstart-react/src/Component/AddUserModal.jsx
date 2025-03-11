import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
Modal.setAppElement("#root");

const AddUserModal = ({ isOpen, onClose, getData }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      let query =
        "mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id: 8663433497, item_name: $myItemName, column_values: $columnVals) { id } }";

      let vars = {
        myItemName: `${firstName} ${lastName}`,
        columnVals: JSON.stringify({
          text_mknymf5g: lastName,
          text_mknyke0r: email,
          text_mkny3hv7: firstName,
          color_mknx8dmx: { label: status },
        }),
      };

      await fetch("https://api.monday.com/v2", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_API_URL,
        },
        body: JSON.stringify({
          query: query,
          variables: JSON.stringify(vars),
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        setEmail("");
        setFirstName("");
        setLastName("");
        setStatus("");

        onClose();
        getData();
        toast.success("Sucessfully added");
      });
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  // 8663433497
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel='Add User Modal'
      className='bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto w-[80%] '
      overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <h2 className='text-lg font-bold mb-4'>Add a New User</h2>
      <form
        className='max-w-sm mx-auto'
        onSubmit={(event) => submitHandler(event)}>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Email
          </label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='JohnSmith@gmail.com'
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='firstName'
            className='block mb-2 text-sm font-medium text-gray-900'>
            First Name
          </label>
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder='John'
            type='text'
            id='firstName'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='lastName'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Last Name
          </label>
          <input
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder='Smith'
            type='text'
            id='lastName'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='status'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Status
          </label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            id='status'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            required>
            <option value='' disabled>
              Select a status
            </option>
            <option value='Done'>Done</option>
            <option value='Working on it'>Working on it</option>
            <option value='Stuck'>Stuck</option>
          </select>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default AddUserModal;
