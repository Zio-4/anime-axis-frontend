import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import AnimeCardByScore from './Anime/AnimeCardByScore'
import AnimeCardAiring from './Anime/AnimeCardAiring'
import AnimeCardPopularity from './Anime/AnimeCardPopularity'
import AnimeCardUpcoming from './Anime/AnimeCardUpcoming'
import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {RiSearchLine} from "react-icons/ri";
import Loading from './Loading'
import {useGetData} from '../Hooks/useGetData'
import { useDispatch } from 'react-redux'
import { updateSearchQuery, updateSearchResults } from '../Redux-Toolkit/search'
import axios from 'axios'


function Homepage() {
    const [animeSearchQuery, setAnimeSearchQuery] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()

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
        setAnimeSearchQuery(e.target.value)
    }

    // Handle a search

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(updateSearchQuery(animeSearchQuery))
        try {
            let response = await axios(`https://api.jikan.moe/v3/search/anime?q=${animeSearchQuery}&order_by=title&sort=asc&limit=10`)
            dispatch(updateSearchResults(response.data.results))
            history.push(`/search/anime`)
        } catch(error) {
            console.log(error)
        }
    }

    const renderTopAnimeByScoreCards = animeScore.data.top.slice(0,6).map(anime => {  
      return (<AnimeCardByScore key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    const renderTopAnimeAiring = animeAiring.data.top.slice(0,6).map(anime => {
        return (<AnimeCardAiring key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    const renderTopAnimeByPopularity = animePopularity.data.top.slice(0,6).map(anime => {
        return (<AnimeCardPopularity key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    const renderTopUpcomingAnime = animeUpcoming.data.top.slice(0,6).map(anime => {
        return (<AnimeCardUpcoming key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.image_url}/>)
    })

    return (
        <>
            <Container className="anime-search">
                    <Col style={{width: '22rem'}} className='mx-auto'>
                        <div className="searchbar">
                            <input type="text" className="search-input" value={animeSearchQuery} onChange={handleChange} placeholder="eg. 'Naruto'"/>
                            <div onClick={handleSubmit} className="search-icon"><RiSearchLine/></div>
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
