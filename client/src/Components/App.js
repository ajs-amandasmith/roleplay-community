import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../reducer/user";
import { fetchAllCharacters } from "../reducer/allCharacters";
import NavBar from "./NavBar";
import ProfilePage from "./ProfilePage";
import Character from "./Character";
import CharacterPage from "./CharacterPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Post from "./Post";
import LandingPage from "./LandingPage";

function App() {
  const [allPosts, setAllPosts] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const dispatch = useDispatch();
  const [signedUp, setSignedUp] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchAllCharacters());
  // eslint-disable-next-line  
  }, [])

  useEffect(() => {
    fetch('/posts')
      .then(r => {
        if (r.ok) {
          r.json().then(posts => setAllPosts(posts))
        }
      })
  // eslint-disable-next-line  
  }, [])

  useEffect(() => {
    fetch('/tags')
      .then(r => {
        if (r.ok) {
          r.json().then(tags => setAllTags(tags))
        }
      })
  }, [])

  useEffect(() => {
    fetch('/characters')
      .then(r => {
        if (r.ok) {
          r.json().then(characters => setAllCharacters(characters))
        }
      })
  }, [])

  function updateAllPosts(postUpdate, op) {
    let newPosts;
    switch(op) {
      case "add":
        newPosts = [...allPosts, postUpdate]
        setAllPosts(newPosts);
        break;
      case "delete":
        newPosts = allPosts.filter(post => post.id !== postUpdate.id)
        setAllPosts(newPosts);
        break;
      case "update":
        newPosts = allPosts.filter(post => {
          if (post.id === postUpdate.id) {
            post.comments = postUpdate.comments;
            return post;
          }
          return post
        })
        setAllPosts(newPosts);
        break;
      case "character-delete":
        newPosts = allPosts.filter(post => {
          return postUpdate.posts.every(char => {
            return char.id !== post.id
          })
        })
        setAllPosts(newPosts);
        break;
      default:
    }
  }

  function updateAllCharacters(characterUpdate, op) {
    let newCharacters;
    switch(op) {
      case "add":
        newCharacters = [...allCharacters, characterUpdate]
        setAllCharacters(newCharacters);
        break;
      default:
    }
  }
  
  return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div className="relative flex min-h-screen flex-col bg-slate-300 py-6">
            <Switch>
              <Route exact path="/">
                <LandingPage allPosts={allPosts} updateAllPosts={updateAllPosts} updateAllCharacters={updateAllCharacters} allTags={allTags}/>
              </Route>
              <Route path="/posts/:id">
                <Post updateAllPosts={updateAllPosts} updateAllCharacters={updateAllCharacters} allTags={allTags} />
              </Route>
              <Route path="/profile">
                  <ProfilePage updateAllPosts={updateAllPosts} updateAllCharacters={updateAllCharacters} allTags={allTags} />
              </Route>
              <Route path="/characters/:id">
                <Character updateAllPosts={updateAllPosts} updateAllCharacters={updateAllCharacters} />
              </Route>
              <Route path="/characters">
                <CharacterPage allCharacters={allCharacters} updateAllCharacters={updateAllCharacters} />
              </Route>
              <Route path="/login">
                  <LoginPage />
              </Route>
              <Route path="/signup">
                <SignupPage signedUp={signedUp} setSignedUp={setSignedUp} />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>   
  );
}

export default App;
