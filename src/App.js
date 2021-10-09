import Homepage from "./Components/Homepage"
import Login from "./Components/User/Login"
import SignUp from "./Components/User/SignUp"
import {Switch, Route, Redirect} from 'react-router-dom'
import NavBar from './Components/NavBar'
import About from './Components/About'
import AnimePage from './Components/Anime/AnimePage'
import {useState, useEffect} from 'react'
import ProfilePage from "./Components/User/ProfilePage"
import Loading from './Components/Loading'
import React from 'react'
import MangaHome from './Components/Manga/MangaHome'

function App() {
  // null or false?
  // use CB's for setting user data?
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/user")
    .then(r => r.json())
    .then(userData => {
      console.log("userData in App", userData)
      if (userData.errors) {
        setLoading(false)
        setUser(false)  
      } else {
        setLoading(false)
        setUser(userData)
      }
    })
  }, [])

  console.log("loading:", loading)

  console.log("user:", user)

  function onLogin(userData) {
    setUser(userData)
  }

  function onLogout() {
    setUser(false)
  }



  return (
    <div className="App">
      {loading ? <Loading /> : 
      <>
        <NavBar user={user} onLogout={onLogout}/>
        <Switch>
          <Route exact path="/loading">
            <Loading />
          </Route>
          <Route exact path="/manga">
            <MangaHome />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/anime/:id">
            <AnimePage />
          </Route>
          <Route exact path="/login">
            <Login onLogin={onLogin}/>
          </Route>
          <Route exact path="/signup">
            <SignUp setUser={setUser}/>
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
      </>}
    </div>
  );
}

export default App;
