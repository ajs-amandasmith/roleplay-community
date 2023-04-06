import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../reducer/user";
import NavBar from "./NavBar";
import ProfilePage from "./ProfilePage";
import CharacterPage from "./CharacterPage";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Post from "./Post";

function App() {
  const [allPosts, setAllPosts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchUser());
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
  );
}

export default App;
