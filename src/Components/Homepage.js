import {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import AnimeCardByScore from './Anime/AnimeCardByScore'
import AnimeCardAiring from './Anime/AnimeCardAiring'
import AnimeCardPopularity from './Anime/AnimeCardPopularity'
import AnimeCardUpcoming from './Anime/AnimeCardUpcoming'
import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import Col from 'react-bootstrap/Col'

function Homepage({onAnimeSearch}) {
    const [topAnimeByScore, setTopAnimeByScore] = useState([])
    const [topAnimeAiring, setTopAnimeAiring] = useState([])
    const [topAnimeByPopularity, setTopAnimeByPopularity] = useState([])
    const [topUpcomingAnime, setTopUpcomingAnime] = useState([])
    const [search, setSearch] = useState("")
    const history = useHistory()

    const fetchTopAnimesByScore = () => {
        fetch("https://api.jikan.moe/v3/top/anime/1/tv")
        .then((r) => r.json())
        .then((data) => {
                    // Only using the top 5 anime
                    setTopAnimeByScore(data.top.slice(0,5))
                })
            }
 
    const fetchTopAnimeAiring = () => {
        fetch("https://api.jikan.moe/v3/top/anime/1/airing")
        .then((r) => r.json())
        .then((data) => {
                    setTopAnimeAiring(data.top.slice(0,5))
                })
            }
    
    const fetchTopAnimeByPopularity = () => {
        fetch("https://api.jikan.moe/v3/top/anime/1/bypopularity")
        .then((r) => r.json())
        .then((data) => {
                    setTopAnimeByPopularity(data.top.slice(0,5))
                })
            }

    const fetchTopUpcomingAnime = () => {
        fetch("https://api.jikan.moe/v3/top/anime/1/upcoming")
        .then((r) => r.json())
        .then((data) => {
                    setTopUpcomingAnime(data.top.slice(0,5))
                })
            }

    useEffect(() => {
        fetchTopAnimesByScore()
        fetchTopAnimeAiring() 
        fetchTopAnimeByPopularity()
        fetchTopUpcomingAnime()
    }, [])

    function handleChange(e) {
        setSearch(mUV => e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`https://api.jikan.moe/v3/search/anime?q=${search}&order_by=title&sort=asc&limit=20`)
        .then(r => r.json())
        .then(searchResultData => {
            console.log("search result data", searchResultData)
            onAnimeSearch(searchResultData)
        })
        history.push(`/search/anime`)
    }

    console.log("search state:", search)

    const renderTopAnimeByScoreCards = topAnimeByScore.map(anime => {  
      return (<AnimeCardByScore key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    const renderTopAnimeAiring = topAnimeAiring.map(anime => {
        return (<AnimeCardAiring key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    const renderTopAnimeByPopularity = topAnimeByPopularity.map(anime => {
        return (<AnimeCardPopularity key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    const renderTopUpcomingAnime = topUpcomingAnime.map(anime => {
        return (<AnimeCardUpcoming key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    return (
        <>
        <Container className="anime-search">
            <Row>
                <Col>
                    <input  type="text" value={search} onChange={handleChange} placeholder="eg. 'Naruto'"></input>
                    <button type="submit" onClick={handleSubmit} >Search</button>
                </Col>
            </Row>
        </Container>

        <Container fluid="md" className="homepage-container">
            <p>Top anime by Score</p>
            <Row>
                {renderTopAnimeByScoreCards}
                <Link to="/topanime/score">See more</Link>
            </Row>
            <p>Top anime currently airing</p>
            <Row>
                {renderTopAnimeAiring}
                <Link to="/topanime/airing">See more</Link>
            </Row>
            <p>Top upcoming anime</p>
            <Row>
                {renderTopUpcomingAnime}
                <Link to="/topanime/upcoming">See more</Link>
            </Row>
            <p>Top anime by popularity</p>
            <Row>
                {renderTopAnimeByPopularity}
                <Link to="/topanime/popularity">See more</Link>
            </Row>
        </Container>
        </>
    )
}

export default Homepage
