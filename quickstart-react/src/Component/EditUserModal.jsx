import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
Modal.setAppElement("#root");

const columnMapping = {
  text_mkny3hv7: "First Name",
  text_mknymf5g: "Last Name",
  text_mknyke0r: "Email",
  color_mknx8dmx: "Status",
};

const EditUserModal = ({ isOpen, onClose, data, getData }) => {
  const [formState, setFormState] = useState({
    Email: "",
    firstName: "",
    lastName: "",
    Status: "",
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    let query = `
    mutation ($itemId: ID!, $body: String!) {
      create_update (item_id: $itemId, body: $body) {
        id
      }
    }
  `;

    const bodyContent = `
    'text_mknymf5g': ${formState.lastName}, 
    'text_mkny3hv7': ${formState.firstName}, 
    'text_mknyke0r: ${formState.Email}, 
    'color_mknx8dmx': ${formState.Status}
  `;

    let vars = {
      itemId: data.id, // Ensure `data.id` is a valid ID (string or number)
      body: bodyContent,
    };

    try {
      const response = await fetch("https://api.monday.com/v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_API_URL,
        },
        body: JSON.stringify({
          query: query,
          variables: vars,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      getData();
      toast.success("User Updated!");
      onClose();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleInputChange = (event, key) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  // Prepopulating the form data when modal is opened
  useEffect(() => {
    if (data) {
      const mappedData = {};

      data.column_values.forEach((col) => {
        switch (col.id) {
          case "text_mkny3hv7":
            mappedData.firstName = col.text;
            break;
          case "text_mknymf5g":
            mappedData.lastName = col.text;
            break;
          case "text_mknyke0r":
            mappedData.email = col.text;
            break;
          case "color_mknx8dmx":
            mappedData.Status = col.text;
            break;
          default:
            break;
        }
      });

      setFormState((prevState) => ({
        ...prevState,
        ...mappedData,
      }));
    }
  }, [data]);

  console.log(formState.Status);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel='Edit User Modal'
      className='bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto w-[80%]'
      overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <h2 className='text-lg font-bold mb-4'>Edit User</h2>
      <form onSubmit={submitHandler}>
        <div className='mb-5'>
          <label
            htmlFor='firstName'
            className='block mb-2 text-sm font-medium text-gray-900'>
            First Name
          </label>
          <input
            minLength={1}
            value={formState.firstName}
            onChange={(event) => handleInputChange(event, "firstName")}
            type='text'
            id='firstName'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Enter First Name'
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
            minLength={1}
            value={formState.lastName}
            onChange={(event) => handleInputChange(event, "lastName")}
            type='text'
            id='lastName'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Enter Last Name'
            required
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Email
          </label>
          <input
            value={formState.email}
            onChange={(event) => handleInputChange(event, "email")}
            type='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Enter Email'
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
            value={formState.Status}
            onChange={(event) => handleInputChange(event, "Status")}
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
          Save
        </button>
      </form>
    </Modal>
  );
};

export default EditUserModal;
