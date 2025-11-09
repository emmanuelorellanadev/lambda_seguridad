import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [urlLambda, setUrlLambda] = useState("http://localhost:8080");
  const [token, setToken] = useState('');
  const [loggedUser, setLoggedUser] = useState('');
  const [loggedRole, setLoggedRole] = useState('');
  const [uid, setUId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [branch, setBranch] = useState('');

    
  const globalContext = {
    urlLambda,
    token, setToken,
    loggedUser, setLoggedUser,
    loggedRole, setLoggedRole,
    uid, setUId,
    branchId, setBranchId,
    branch, setBranch,
  };

  return (
    <GlobalContext.Provider value={{...globalContext}}>
      {children}
    </GlobalContext.Provider>
  );
};