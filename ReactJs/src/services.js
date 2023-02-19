import axios from "axios";

// console.log(process.env.REACT_APP_CRUD_API);

const BACKEND_URL = "";

export const getItems = async () => {
  const items = await axios.get(`${BACKEND_URL}/getAll`);
  console.log(items);
  return items.data;
};

export const createItem = async (item) => {
  const newItem = await axios.post(`${BACKEND_URL}/create`, item);
  return newItem.data;
};

export const updateItem = async (item) => {
  const updatedItem = await axios.post(
    `${BACKEND_URL}/update/${item._id}`,
    item
  );
  return updatedItem.data.updatedForm;
};

export const deleteItem = async (item) => {
  const deletedItem = await axios.post(`${BACKEND_URL}/delete/${item._id}`);
  return deletedItem.data.message;
};

export const mailItems = async (items) => {
  const mailedItems = await axios.post(`${BACKEND_URL}/mail`, items);
  window.open(mailedItems.data.sendMailData.url, "_blank").focus();
  return mailedItems.data.message;
};
