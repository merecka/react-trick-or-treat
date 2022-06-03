import React, { useState } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        {children}
      </UserContext.Provider>
    );
  }

  export { UserContext, UserProvider };