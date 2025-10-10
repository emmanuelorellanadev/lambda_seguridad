import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [urlLambda, setUrlLambda] = useState("http://localhost:8080");
  const [token, setToken] = useState("change token");

    
  const globalContext = {
    urlLambda,
    token, setToken
  };

  return (
    <GlobalContext.Provider value={{...globalContext}}>
      {children}
    </GlobalContext.Provider>
  );
};