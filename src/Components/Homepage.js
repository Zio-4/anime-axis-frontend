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
import Button from 'react-bootstrap/Button'
import {RiSearchLine} from "react-icons/ri";
import {useQuery} from 'react-query'
import axios from 'axios'
import Loading from './Loading'


function Homepage({onAnimeSearch, updateAnimeSearchQuery, animeSearchQuery}) {
    const history = useHistory()

    // fetching data functions

    const getTopAnimeByScore = async () => {
        try {
            return await axios("https://api.jikan.moe/v3/top/anime/1/tv")
        } catch (error) {
            console.log(error.message)
        }
     }
     
     const getTopAnimeByAiring = async () => {
         try {
            return await axios("https://api.jikan.moe/v3/top/anime/1/airing")
         } catch(error) {
             console.log(error.message)
         }
     }
     
     const getTopAnimeByPopularity = async () => {
         try {
            return await axios("https://api.jikan.moe/v3/top/anime/1/bypopularity")
         } catch(error) {
             console.log(error.message)
         }
     }
     
     const getTopAnimeByUpcoming = async () => {
         try {
            return await axios("https://api.jikan.moe/v3/top/anime/1/upcoming")
         } catch(error) {
             console.log(error.message)
         }
     }

     // Using aliases to identify each fetches data by name
     
     const {data: animeScore, isLoading: animeScoreLoading} = useQuery('topAnimeByScore', getTopAnimeByScore)
     const {data: animeAiring, isLoading: animeAiringLoading} = useQuery('topAnimeByAiring', getTopAnimeByAiring)
     const {data: animePopularity, isLoading: animePopularityLoading} = useQuery('topAnimeByPopularity', getTopAnimeByPopularity)
     const {data: animeUpcoming, isLoading: animeUpcomingLoading} = useQuery('topAnimeByUpcoming', getTopAnimeByUpcoming)
 
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
            <p className='mt-4 text-center'>Top anime by Score</p>
            <Row>

                {renderTopAnimeByScoreCards}

                <Container>
                    <Link to="/topanime/score"><Button className="top-list-button" size="md">See More</Button></Link>
                </Container>
            </Row>
            <p className='mt-4 text-center'>Top anime currently airing</p>
            <Row>
                {renderTopAnimeAiring}
                <Container>
                    <Link to="/topanime/airing"><Button className="top-list-button" size="md">See More</Button></Link>
                </Container>
            </Row>
            <p className='mt-4 text-center'>Top upcoming anime</p>
            <Row>
                {renderTopUpcomingAnime}
                <Container>
                    <Link to="/topanime/upcoming"><Button className="top-list-button" size="md">See More</Button></Link>
                </Container>
            </Row>
            <p className='mt-4 text-center'>Top anime by popularity</p>
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
