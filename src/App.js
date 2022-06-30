import "./App.css";
import React, { useContext, useState } from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import { UserProvider } from "./context/user";
import Signup from "./components/Signup";
import Host from "./components/Host/Host";
import Viewer from "./components/Viewer/Viewer";
import { UsersContext } from "./context/users";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { users, setUsers } = useContext(UsersContext);

  return (
    <div className="App">
      <UserProvider>
        <Route exact path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} users={users} />
        </Route>
        <Route exact path="/signup">
          <Signup
            setIsLoggedIn={setIsLoggedIn}
            setUsers={setUsers}
            users={users}
          />
        </Route>
        <Route exact path="/host">
          <Host isLoggedIn={isLoggedIn} users={users} />
        </Route>
        <Route exact path="/viewer">
          <Viewer isLoggedIn={isLoggedIn} users={users} />
        </Route>
        <Route exact path="/">
          <Host isLoggedIn={isLoggedIn} users={users} />
        </Route>
      </UserProvider>
    </div>
  );
}

export default App;
