import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";

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
        {/* <Switch>
          <Route path="/testing">
            <h1>Test Route</h1>
          </Route>
          <Route path="/">
            <h1></h1>
          </Route>
        </Switch> */}
      </div>
    </BrowserRouter>
   
  );
}

export default App;
