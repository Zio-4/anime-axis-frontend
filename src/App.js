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
import MangaPage from './Components/Manga/MangaPage'
import Forums from './Components/Forums/Forums'
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
import CommentForm from "./Components/Forums/CommentForm"


function App() {
  // null or false?
  // use CB's for setting user data?
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(true)
  const [animeSearchQuery, setAnimeSearchQuery] = useState("")
  const [animeSearchResults, setAnimeSearchResults] = useState([])

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


  function onLogin(userData) {
    setUser(userData)
  }

  function onLogout() {
    setUser(false)
  }

  function updateAnimeSearchQuery(query) {
    setAnimeSearchQuery(query)
  }

  function onAnimeSearch(searchResults) {
    setAnimeSearchResults(searchResults.results)
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
          <Route exact path="/forums/post/comment">
            <CommentForm />
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
          <Route exact path="/search/anime">
            <AnimeSearchPage animeSearchResults={animeSearchResults} animeSearchQuery={animeSearchQuery}/>
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
          <Route exact path="/forums">
            <Forums />
          </Route>
          <Route exact path="/manga/:id">
            <MangaPage />
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
            <Homepage onAnimeSearch={onAnimeSearch} updateAnimeSearchQuery={updateAnimeSearchQuery} animeSearchQuery={animeSearchQuery}/>
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
