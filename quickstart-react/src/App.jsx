import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "@vibe/core/tokens";
import Table from "./Component/Table";
//Explore more Monday React Components here: https://vibe.monday.com/
import { AttentionBox } from "@vibe/core";
import AddUserModal from "./Component/AddUserModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [listData, setListData] = useState([]);

  // I dont know if this is needed

  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", (res) => {
      console.log(res.data.board.id);
      setContext(res.data);
    });
  }, []);

  //Some example what you can do with context, read more here: https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data
  const attentionBoxText = `Hello, your user_id is: ${
    context ? context.user.id : "still loading"
  }.
  Let's start building your amazing app, which will change the world!`;

  //

  const getData = async () => {
    const query = `
        {
          boards(ids: [8663433497]) {
            name
            id
            description
            items_page {
              items {
                name
                id
                column_values {
                  id
                  type
                  text
                }
              }
            }
          }
        }
      `;

    try {
      const res = await fetch("https://api.monday.com/v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ4MzU0MTI2MywiYWFpIjoxMSwidWlkIjo3MzI1Nzk2NywiaWFkIjoiMjAyNS0wMy0xMFQxOTo0NToxNC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6Mjg0NjY3ODAsInJnbiI6InVzZTEifQ.EH_qsIFifbEoN1orsWbTa_5iO50NY-FHhYWBPUCJpks",
        },
        body: JSON.stringify({ query }),
      });

      const jsonResponse = await res.json();

      console.log(JSON.stringify(jsonResponse.data.boards[0].items_page.items));
      setListData(JSON.stringify(jsonResponse.data.boards[0].items_page.items));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex items-center justify-center h-screen'>
      <ToastContainer />
      <div className='text-green-500 text-center'>
        <button
          onClick={(event) => setIsAddUserModalOpen(true)}
          type='button'
          className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
          Add a User
        </button>
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          getData={getData}
        />

        {listData && listData.length > 1 ? (
          <Table data={JSON.parse(listData)} getData={getData} />
        ) : (
          <div>Loading or No Data Available</div>
        )}
      </div>
    </div>
  );
};

export default App;
