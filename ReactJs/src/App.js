import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";

import { ContextProvider } from "./context";

const App = () => {
  return (
    <>
      <Header />
      <ContextProvider>
        <Form />
        <List />
      </ContextProvider>
    </>
  );
};

export default App;
