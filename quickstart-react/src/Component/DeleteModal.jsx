import React, { useState, useCallback } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const DeleteUserModal = ({ isOpen, onClose, id }) => {
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      let query = `mutation { delete_item (item_id: ${id}) { id }}`;

      await fetch("https://api.monday.com/v2", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ4MzU0MTI2MywiYWFpIjoxMSwidWlkIjo3MzI1Nzk2NywiaWFkIjoiMjAyNS0wMy0xMFQxOTo0NToxNC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6Mjg0NjY3ODAsInJnbiI6InVzZTEifQ.EH_qsIFifbEoN1orsWbTa_5iO50NY-FHhYWBPUCJpks",
        },
        body: JSON.stringify({
          query: query,
        }),
      }).then((res) => {
        onClose();
      });
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel='Add User Modal'
      className='bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto w-[80%] '
      overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <h2 className='text-lg font-bold mb-4'>Delete Contact</h2>
      <div className='flex flex-row'>
        <button
          onClick={(event) => submitHandler(event)}
          className='text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md mr-2'>
          Yes
        </button>
        <button
          onClick={() => onClose()}
          className='text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md'>
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
