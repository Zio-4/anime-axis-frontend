import Homepage from "./Components/Homepage"
import Login from "./Components/User/Login"
import SignUp from "./Components/User/SignUp"
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './Components/NavBar'
import AnimePage from './Components/Anime/AnimePage'
import ProfilePage from "./Components/User/ProfilePage"
import Loading from './Components/Loading'
import React, { useState, useEffect } from 'react'
import MangaHome from './Components/Manga/MangaHome'
import MangaPage from './Components/Manga/MangaPage'
import AnimeSearchPage from "./Components/Anime/AnimeSearchPage"
import AnimeForum from "./Components/Forums/AnimeForum"
import GeneralForum from "./Components/Forums/GeneralForum"
import MangaForum from "./Components/Forums/MangaForum"
import ForumPostForm from "./Components/Forums/ForumPostForm"
import ForumPost from "./Components/Forums/ForumPost"
import AnimeList from "./Components/Anime/AnimeList"
import MangaList from "./Components/Manga/MangaList"
import MangaSearchPage from "./Components/Manga/MangaSearchPage"
import {useGetData} from './Hooks/useGetData'
import TopList from "./Components/TopList"

function App() {
  // User state for conditional rendering of logout icon
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)

  useEffect(() => {
    document.body.style.backgroundColor = "#FFFAFA"
  }, [])


  setInterval(() => {
    console.log('cold start prevention')
  }, 300000)


  const onSuccess = (data) => {
    if (data) {
      setUserIsLoggedIn(true)
    }
  }

  const {data: user, isLoading: userIsLoading} = useGetData('https://anime-axis-api.herokuapp.com/user', onSuccess)
  
  if (userIsLoading) return <Loading/>



  return (
    <div className="App">
      {/* {loading ? <Loading /> : 
      <> */}
        <NavBar userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn}/> 
        <Switch>
          <Route exact path="/mangalist">
            <MangaList user={user}/>
          </Route>
          <Route exact path="/animelist">
            <AnimeList user={user}/>
          </Route>
          <Route exact path="/forums/newpost">
            <ForumPostForm user={user}/>
          </Route>
          <Route exact path="/forums/anime">
            <AnimeForum user={user}/>
          </Route>
          <Route exact path="/forums/manga">
            <MangaForum user={user}/>
          </Route>
          <Route exact path="/forums/general">
            <GeneralForum user={user}/>
          </Route>
          <Route exact path="/forums/post/:id">
            <ForumPost user={user}/>
          </Route>
          <Route exact path="/manga/top/score">
            <TopList />
          </Route>
          <Route exact path="/manga/top/oneshots">
            <TopList />
          </Route>
          <Route exact path="/manga/top/novels">
            <TopList />
          </Route>
          <Route exact path="/manga/top/popularity">
            <TopList />
          </Route>
          <Route exact path ="/anime/top/score">
            <TopList />
          </Route>
          <Route exact path="/anime/top/upcoming">
            <TopList />
          </Route>
          <Route exact path="/anime/top/popularity">
            <TopList />
          </Route>
          <Route exact path="/anime/top/airing">
            <TopList />
          </Route>
          <Route exact path="/manga/:id">
            <MangaPage user={user}/>
          </Route>
          <Route exact path="/profile">
            <ProfilePage user={user}/>
          </Route>
          <Route exact path="/anime/:id">
            <AnimePage user={user}/>
          </Route>
          <Route exact path="/login">
            <Login setUserIsLoggedIn={setUserIsLoggedIn}/>
          </Route>
          <Route exact path="/signup">
            <SignUp setUserIsLoggedIn={setUserIsLoggedIn}/>
          </Route>
          <Route exact path="/search/manga">
            <MangaSearchPage />
          </Route>
          <Route exact path="/manga">
            <MangaHome />
          </Route>
          <Route exact path="/search/anime">
            <AnimeSearchPage />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/loading">
            <Loading />
          </Route>
          <Route exact path="/top/anime/score">
            <TopList />
          </Route>

          <Route path="*">
            <h1>404 not found</h1>
            <Redirect from="*" to="/" />
          </Route>
        </Switch>
      {/* </>} */}
    </div>
  );
}

export default App;
