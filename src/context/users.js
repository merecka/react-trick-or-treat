import React, { useEffect, useState } from "react";

const UsersContext = React.createContext();

function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((r) => r.json())
      .then((users) => setUsers(users));
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
