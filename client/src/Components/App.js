import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserProvider, UserContext } from "../Context/user";
import NavBar from "./NavBar";
import ProfilePage from "./ProfilePage";
import CharacterPage from "./CharacterPage";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function App() {
  const { user } = useContext(UserContext);

  console.log('user app', user)
  
  return (
    <BrowserRouter>
       <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/profile">
            <UserProvider>
              <ProfilePage />
            </UserProvider>
          </Route>
          <Route path="/characters">
            <CharacterPage />
          </Route>
          <Route path="/login">
            <UserProvider>
              <LoginForm />
            </UserProvider>
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
   
  );
}

export default App;
