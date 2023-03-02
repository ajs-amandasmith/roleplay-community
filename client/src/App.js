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
        {/* <h1 className="border-4 border-green-400">
          Hello world!
        </h1>
        <h1 className="text-vuejs">
          Hello world!
        </h1> */}
        {/* <p className="mb-5">Hello long sentence</p>
        <p>Another long sentence</p> */}
        <h1 className="text-3xl italic">Title 1</h1>
        <h2 className="text-2xl overline decoration-red-800 decoration-wavy decoration-1">Title 2</h2>
        <h3 className="text-xl">Title 3</h3>
        <p className="text-base">A regular paragraph</p>
        <p className="text-sm">A description paragraph</p>
        <p className="note text-xs">A little note</p>
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
