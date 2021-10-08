import {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import AnimeCardByScore from './AnimePages/AnimeCardByScore'
import AnimeCardAiring from './AnimePages/AnimeCardAiring'
import AnimeCardPopularity from './AnimePages/AnimeCardPopularity'

function Homepage() {
    const [topAnimeByScore, setTopAnimeByScore] = useState([])
    const [topAnimeAiring, setTopAnimeAiring] = useState([])
    const [topAnimeByPopularity, setTopAnimeByPopularity] = useState([])

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

    useEffect(() => {
        fetchTopAnimesByScore()
        fetchTopAnimeAiring() 
        fetchTopAnimeByPopularity()
    }, [])

    const renderTopAnimeByScoreCards = topAnimeByScore.map(anime => {  
      return (<AnimeCardByScore title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    const renderTopAnimeAiring = topAnimeAiring.map(anime => {
        return (<AnimeCardAiring title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    const renderTopAnimeByPopularity = topAnimeByPopularity.map(anime => {
        return (<AnimeCardPopularity title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    return (
        <Container fluid="md" fluid="true" className="mt-5">
            <p>Top anime by Score</p>
            <Row>
                {renderTopAnimeByScoreCards} 
            </Row>
            <p>Top anime currently airing</p>
            <Row>
                {renderTopAnimeAiring}
            </Row>
            <p>Top anime by popularity</p>
            <Row>
                {renderTopAnimeByPopularity}
            </Row>
        </Container>
    )
}

export default Homepage
