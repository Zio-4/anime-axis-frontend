import Homepage from "./Components/Homepage"
import Login from "./Components/User/Login"
import SignUp from "./Components/User/SignUp"
import {Switch, Route, Redirect} from 'react-router-dom'
import NavBar from './Components/NavBar'
import About from './Components/About'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route path="*">
          <h1>404 not found</h1>
          <Redirect from="*" to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
