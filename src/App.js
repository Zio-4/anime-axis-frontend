import Homepage from "./Components/Homepage"
import Login from "./Components/User/Login"
import SignUp from "./Components/User/SignUp"
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './Components/NavBar'
import AnimePage from './Components/Anime/AnimePage'
import ProfilePage from "./Components/User/ProfilePage"
import Loading from './Components/Loading'
import React, { useState } from 'react'
import MangaHome from './Components/Manga/MangaHome'
import MangaPage from './Components/Manga/MangaPage'
import TopAnimeUpcomingList from './Components/Anime/TopAnimeUpcomingList'
import TopAnimeByPopularityList from './Components/Anime/TopAnimeByPopularityList'
import TopAnimeAiringList from './Components/Anime/TopAnimeAiringList'
import TopAnimeByScoreList from './Components/Anime/TopAnimeByScoreList'
import TopMangaNovelsList from "./Components/Manga/TopMangaNovelsList"
import TopMangaByPopularityList from "./Components/Manga/TopMangaByPopularityList"
import TopMangaByScoreList from "./Components/Manga/TopMangaByScoreList"
import TopMangaOneShotsList from "./Components/Manga/TopMangaOneShotsList"
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

function App() {
  // User state for conditional rendering of logout icon
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)


  setInterval(() => {
    let a = 10
  }, 100000)


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
          <Route exact path="/topmanga/score">
            <TopMangaByScoreList />
          </Route>
          <Route exact path="/topmanga/oneshots">
            <TopMangaOneShotsList />
          </Route>
          <Route exact path="/topmanga/novels">
            <TopMangaNovelsList />
          </Route>
          <Route exact path="/topmanga/popularity">
            <TopMangaByPopularityList />
          </Route>
          <Route exact path ="/topanime/score">
            <TopAnimeByScoreList />
          </Route>
          <Route exact path="/topanime/upcoming">
            <TopAnimeUpcomingList />
          </Route>
          <Route exact path="/topanime/popularity">
            <TopAnimeByPopularityList />
          </Route>
          <Route exact path="/topanime/airing">
            <TopAnimeAiringList />
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
