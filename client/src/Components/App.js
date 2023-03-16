import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserProvider } from "../Context/user";
import NavBar from "./NavBar";
import ProfilePage from "./ProfilePage";
import CharacterPage from "./CharacterPage";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function App() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch('/posts')
      .then(r => {
        if (r.ok) {
          r.json().then(posts => setAllPosts(posts))
        }
      })
  }, [])
  
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage allPosts={allPosts} />
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
            <Route path="/signup">
              <SignupForm />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </UserProvider>
   
  );
}

export default App;
