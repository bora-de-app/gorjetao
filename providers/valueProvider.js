import { createContext, useContext, useState } from "react";

const ValueContext = createContext();

const ValueProvider = ({ children }) => {
  const [value, setValue] = useState(0);

  return (
    <ValueContext.Provider value={{ value, setValue }}>
      {children}
    </ValueContext.Provider>
  );
};

export const useValueContext = () => useContext(ValueContext);

export default ValueProvider;
