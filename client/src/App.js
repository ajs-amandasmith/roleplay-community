import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, [])

  console.log(users)
  
  return (
    <BrowserRouter>
       <div className="App">
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>

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
