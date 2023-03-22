import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserProvider } from "../Context/user";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import ProfilePage from "./ProfilePage";
import CharacterPage from "./CharacterPage";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Post from "./Post";

function App() {
  const [allPosts, setAllPosts] = useState([]);
  const user = useSelector((state) => state)
  const dispatch = useDispatch();

  console.log('user', user)

  useEffect(() => {
    fetch("/me").then((r) => {
      if(r.ok) {
        r.json().then((data) => {
          dispatch({ type: "set-user", payload: data})
        })
      }
    })
  }, [])

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
            <Route path="/posts/:id">
              <Post />
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
