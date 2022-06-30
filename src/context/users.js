import React, { useEffect, useState } from "react";

const UsersContext = React.createContext();

function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/users")
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
