import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const defAuthToken = localStorage.getItem("$AUTH_TOKEN") || "";
  const defUsername = localStorage.getItem("username") || "John Doe";

  const [userDetails, setUserDetails] = useState({
    authToken: defAuthToken,
    username: defUsername,
  });

  useEffect(() => {
    setUserDetails({
      ...userDetails,
      authToken: localStorage.getItem("$AUTH_TOKEN"),
    });
  }, [localStorage.getItem("$AUTH_TOKEN")]);

  return (
    <UserContext.Provider value={[userDetails, setUserDetails]}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };

