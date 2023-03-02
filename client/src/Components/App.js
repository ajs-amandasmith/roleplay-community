import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import ProfilePage from "./ProfilePage";
import CharacterPage from "./CharacterPage";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutForm";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("/me")
      .then((r) => r.json())
      .then((data) => setUser(data));
  }, [])

  console.log(user)
  
  return (
    <BrowserRouter>
       <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/characters">
            <CharacterPage />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/logout">
            <LogoutForm />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
   
  );
}

export default App;