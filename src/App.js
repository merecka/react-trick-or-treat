import './App.css';
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Login from './components/Login';
import { UserProvider } from './context/user';
import Signup from './components/Signup';
import Host from './components/host/Host';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((r) => r.json())
      .then((users) => setUsers(users));

      console.log("current users are: " + JSON.stringify(users))
  }, [isLoggedIn])
  

  return (
    <div className="App">
      <UserProvider>
        <Route exact path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} users={users} />
        </Route>
        <Route exact path="/signup">
          <Signup setIsLoggedIn={setIsLoggedIn} setUsers={setUsers} users={users} />
        </Route>
        <Route exact path="/">
          <Host isLoggedIn={isLoggedIn} />
        </Route>  
      </UserProvider>
    </div>
  );
}

export default App;
