import { createContext, useReducer, useState } from "react";

const context = createContext([]);

const reducer = (items, action) => {
  switch (action.type) {
    case "Get":
      return [...action.payload];
    case "Create":
      return [...items, action.payload];
    case "Update":
      return [
        ...items.filter((item) => item._id !== action.payload._id),
        action.payload,
      ];
    case "Delete":
      return items.filter((item) => item._id !== action.payload._id);
    default:
      throw new Error("No such action defined");
  }
};

export const ContextProvider = (props) => {
  const [editing, setEditing] = useState({});
  const [items, dispatch] = useReducer(reducer, []);

  return (
    <context.Provider value={{ items, dispatch, editing, setEditing }}>
      {props.children}
    </context.Provider>
  );
};

export default context;
