import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import AnimeCardByScore from './Anime/AnimeCardByScore'
import AnimeCardAiring from './Anime/AnimeCardAiring'
import AnimeCardPopularity from './Anime/AnimeCardPopularity'
import AnimeCardUpcoming from './Anime/AnimeCardUpcoming'
import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {RiSearchLine} from "react-icons/ri";
import Loading from './Loading'
import {useGetData} from '../Hooks/useGetData'


function Homepage({onAnimeSearch, updateAnimeSearchQuery, animeSearchQuery}) {
    const history = useHistory()

    // fetching data functions

     // Using aliases to identify each fetches data by name
     
     const {data: animeScore, isLoading: animeScoreLoading} = useGetData('https://api.jikan.moe/v3/top/anime/1/tv')
     const {data: animeAiring, isLoading: animeAiringLoading} = useGetData('https://api.jikan.moe/v3/top/anime/1/airing')
     const {data: animePopularity, isLoading: animePopularityLoading} = useGetData('https://api.jikan.moe/v3/top/anime/1/bypopularity')
     const {data: animeUpcoming, isLoading: animeUpcomingLoading} = useGetData('https://api.jikan.moe/v3/top/anime/1/upcoming')
 
     if (animeScoreLoading) return <Loading /> 
     if (animeAiringLoading) return <Loading />
     if (animePopularityLoading) return <Loading />
     if (animeUpcomingLoading) return <Loading />

    // Update search

    function handleChange(e) {
        updateAnimeSearchQuery(mUV => e.target.value)
    }

    // Handle a search

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`https://api.jikan.moe/v3/search/anime?q=${animeSearchQuery}&order_by=title&sort=asc&limit=10`)
        .then(r => r.json())
        .then(searchResultData => {
            console.log("search result data", searchResultData)
            onAnimeSearch(searchResultData)
        })
        history.push(`/search/anime`)
    }

    const renderTopAnimeByScoreCards = animeScore.data.top.slice(0,5).map(anime => {  
      return (<AnimeCardByScore key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    const renderTopAnimeAiring = animeAiring.data.top.slice(0,5).map(anime => {
        return (<AnimeCardAiring key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    const renderTopAnimeByPopularity = animePopularity.data.top.slice(0,5).map(anime => {
        return (<AnimeCardPopularity key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    const renderTopUpcomingAnime = animeUpcoming.data.top.slice(0,5).map(anime => {
        return (<AnimeCardUpcoming key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    return (
        <>
            <Container className="anime-search">
                <Col style={{width: '22rem'}} className='mx-auto'>
                    <div className="searchbar">
                        <input type="text" className="search-input" value={animeSearchQuery} onChange={handleChange} placeholder="eg. 'Naruto'"/>
                        <a href="/#" onClick={handleSubmit} className="search-icon"><RiSearchLine/></a>
                    </div>
                </Col>
            </Container>

            <Container fluid="md" className="homepage-container">
                <p className='headers mt-4'>Top anime by score</p>
                <Row>

                    {renderTopAnimeByScoreCards}

                    <Container>
                        <Link to="/topanime/score"><Button className="top-list-button" size="md">See More</Button></Link>
                    </Container>
                </Row>
                <p className='headers mt-4'>Top anime currently airing</p>
                <Row>
                    {renderTopAnimeAiring}
                    <Container>
                        <Link to="/topanime/airing"><Button className="top-list-button" size="md">See More</Button></Link>
                    </Container>
                </Row>
                <p className='headers mt-4'>Top upcoming anime</p>
                <Row>
                    {renderTopUpcomingAnime}
                    <Container>
                        <Link to="/topanime/upcoming"><Button className="top-list-button" size="md">See More</Button></Link>
                    </Container>
                </Row>
                <p className='headers mt-4'>Top anime by popularity</p>
                <Row>
                    {renderTopAnimeByPopularity}
                    <Container>
                        <Link to="/topanime/popularity"><Button className="top-list-button" id="bottom-see-more-button-anime" size="md">See More</Button></Link>
                    </Container>
                </Row>
            </Container>
        </>
    )
}

export default Homepage
