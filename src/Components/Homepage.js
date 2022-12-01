import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {RiSearchLine} from "react-icons/ri";
import Loading from './Loading'
import { useGetData } from '../Hooks/useGetData'
import { useDispatch } from 'react-redux'
import { updateSearchQuery, updateSearchResults } from '../Redux-Toolkit/search'
import axios from 'axios'
import Card from './Card'
import { useQuery } from 'react-query'


function Homepage() {
    const [animeSearchQuery, setAnimeSearchQuery] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()


    // fetching data functions
    const animeUpcomingFetcher = async () => {
        let res = await axios('https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=6')
        return res
    }
    
    // Using aliases to identify each fetches data by name
    const { data: animeScore, isLoading: animeScoreLoading } = useGetData('https://api.jikan.moe/v4/top/anime?type=tv&limit=6')
    const { data: animeAiring, isLoading: animeAiringLoading, isSuccess: animeAiringSuccess } = useGetData('https://api.jikan.moe/v4/top/anime?filter=airing&limit=6')

    // Explicitly using useQuery hook here due to v4 of Jikan API returning an error of too many requests if I use the useGetData hook for all 4 calls.
    const {data: animeUpcoming, isLoading: animeUpcomingLoading} = useQuery('animeByUpcoming', animeUpcomingFetcher, { enabled: animeAiringSuccess })


 
     if (animeScoreLoading) return <Loading /> 
     if (animeAiringLoading) return <Loading />
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
            let response = await axios(`https://api.jikan.moe/v4/anime?q=${animeSearchQuery}&order_by=title&sort=asc&limit=10`)
            console.log('search response :', response.data.data)
            dispatch(updateSearchResults(response.data.data))
            history.push(`/search/anime`)
        } catch(error) {
            console.log(error)
        }
    }

    const renderTopAnimeByScoreCards = animeScore.data.data.map(anime => {  
      return (<Card key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.images.jpg.image_url} path={`/anime/${anime.mal_id}`}/>)
    })

    const renderTopAnimeAiring = animeAiring.data.data.map(anime => {
        return (<Card key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.images.jpg.image_url} path={`/anime/${anime.mal_id}`}/>)
    })

    const renderTopUpcomingAnime = animeUpcoming.data.data.map(anime => {
        return (<Card key={anime.mal_id} title={anime.title} id={anime.mal_id} image={anime.images.jpg.image_url} path={`/anime/${anime.mal_id}`}/>)
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
                        <Link to={{ pathname: "/anime/top/score", state: { animeOrManga: 'anime', type: '', filter: ''}}}><Button className="top-list-button" size="md">See More</Button></Link>
                    </Container>
                </Row>
                <p className='headers mt-4'>Top anime currently airing</p>
                <Row>
                    {renderTopAnimeAiring}
                    <Container>
                        <Link to={{ pathname:"/anime/top/airing", state: { animeOrManga: 'anime', type: '', filter: 'airing'} }}><Button className="top-list-button" size="md">See More</Button></Link>
                    </Container>
                </Row>
                <p className='headers mt-4'>Top upcoming anime</p>
                <Row className='mb-3'>
                    {animeUpcoming && renderTopUpcomingAnime}
                    <Container>
                        <Link to={{ pathname: "/anime/top/upcoming", state: { animeOrManga: 'anime', type: '', filter: 'upcoming'}}}><Button className="top-list-button" size="md">See More</Button></Link>
                    </Container>
                </Row>
            </Container>
        </>
    )
}

export default Homepage
