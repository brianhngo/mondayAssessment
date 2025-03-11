const columnMapping = {
  text_mkny3hv7: "First Name",
  text_mknymf5g: "Last Name",
  text_mknyke0r: "Email",
  color_mknx8dmx: "Status",
};

const dummyData = [
  {
    name: "123 123",
    id: "8674011797",
    column_values: [
      {
        id: "text_mkny3hv7",
        type: "text",
        text: "123",
      },
      {
        id: "color_mknx8dmx",
        type: "status",
        text: "Done",
      },
      {
        id: "text_mknymf5g",
        type: "text",
        text: "123",
      },
      {
        id: "text_mknyke0r",
        type: "text",
        text: "1@mail.com",
      },
    ],
  },
  {
    name: "111 222",
    id: "8674130862",
    column_values: [
      {
        id: "text_mkny3hv7",
        type: "text",
        text: "111",
      },
      {
        id: "color_mknx8dmx",
        type: "status",
        text: "Done",
      },
      {
        id: "text_mknymf5g",
        type: "text",
        text: "222",
      },
      {
        id: "text_mknyke0r",
        type: "text",
        text: "1111@mail.com",
      },
    ],
  },
];

const filteredData = (filteredStatus) => {
  return filteredStatus !== "None"
    ? dummyData.filter((item) =>
        item.column_values.some(
          (column) =>
            column.id === "color_mknx8dmx" && column.text === filteredStatus
        )
      )
    : dummyData;
};

test("Should return length of 2 when status is set to Done", () => {
  let filteredStatus = "Done";
  let result = filteredData(filteredStatus);
  expect(result.length).toBe(2);

  filteredStatus = "None";
  result = filteredData(filteredStatus);
  expect(result.length).toBe(2);
});

test("Should return length of 0 when Status is set to 'Stuck'", () => {
  let filteredStatus = "Stuck";
  let result = filteredData(filteredStatus);
  expect(result.length).toBe(0);
});
