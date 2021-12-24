import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import MangaCardByPopularity from './MangaCardByPopularity'
import MangaCardByScore from './MangaCardByScore'
import MangaCardNovels from './MangaCardNovels'
import MangaCardOneShots from './MangaCardOneShots'
import { Link, useHistory } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { RiSearchLine } from "react-icons/ri";
import Loading from '../Loading'
import { useGetData } from '../../Hooks/useGetData'
import { useDispatch } from 'react-redux'
import { updateSearchQuery, updateSearchResults } from '../../Redux-Toolkit/search'
import axios from 'axios'

function MangaHome() {
    const [mangaSearchQuery, setMangaSearchQuery] = useState('')
    const history = useHistory()
    const dispatch = useDispatch() 

    // fetching data functions

     // Using aliases to identify each fetches data by name
     
     const {data: mangaScore, isLoading: mangaScoreLoading} = useGetData('https://api.jikan.moe/v3/top/manga/1/manga')
     const {data: mangaOneShots, isLoading: mangaOneShotsLoading} = useGetData('https://api.jikan.moe/v3/top/manga/1/oneshots')
     const {data: mangaPopularity, isLoading: mangaPopularityLoading} = useGetData('https://api.jikan.moe/v3/top/manga/1/bypopularity')
     const {data: mangaNovels, isLoading: mangaNovelsLoading} = useGetData('https://api.jikan.moe/v3/top/manga/1/novels')
 
     if (mangaScoreLoading) return <Loading /> 
     if (mangaOneShotsLoading) return <Loading />
     if (mangaPopularityLoading) return <Loading />
     if (mangaNovelsLoading) return <Loading />

    // update search state

    function handleChange(e) {
        setMangaSearchQuery(e.target.value)
    }

    // Handle a search

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(updateSearchQuery(mangaSearchQuery))
        try {
            let response = await axios(`https://api.jikan.moe/v3/search/manga?q=${mangaSearchQuery}&order_by=title&sort=asc&limit=10`)
            dispatch(updateSearchResults(response.data.results))
            history.push(`/search/manga`)
        } catch(error) {
            console.log(error)
        }
    }

    const renderMangaByScore = mangaScore.data.top.slice(0,5).map(manga => {
        return (<MangaCardByScore key={manga.mal_id} title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })

    const renderMangaOneShots = mangaOneShots.data.top.slice(0,5).map(manga => {
        return (<MangaCardOneShots key={manga.mal_id} title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })    

    const renderMangaByPopularity = mangaPopularity.data.top.slice(0,5).map(manga => {
        return (<MangaCardByPopularity key={manga.mal_id} title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })

    const renderMangaNovels = mangaNovels.data.top.slice(0,5).map(manga => {
        return (<MangaCardNovels key={manga.mal_id} title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })



    return (
        <>
            <Container className="manga-search">
                <Col style={{width: '22rem'}} className='mx-auto'>
                    <div className="searchbar">
                        <input type="text" className="search-input" value={mangaSearchQuery} onChange={handleChange} placeholder="eg. 'Tokyo Ghoul'"/>
                        <a href="/#" onClick={handleSubmit} className="search-icon"><RiSearchLine/></a>
                    </div>
                </Col>
            </Container>
            <Container fluid="md" className="manga-homepage-container">
                <p className='headers mt-4'>Top manga by score</p>
                <Row>
                    {renderMangaByScore}
                    <Container>
                        <Link to="/topmanga/score"><Button className="top-list-button-manga" size="md">See more</Button></Link>
                    </Container>
                </Row>
                <p className='headers mt-4'>Top manga one-shots</p>
                <Row>
                    {renderMangaOneShots}
                    <Container>
                        <Link to="/topmanga/oneshots"><Button className="top-list-button-manga" size="md">See more</Button></Link>
                    </Container>
                </Row>
                <p className='headers mt-4'>Top manga by popularity</p>
                <Row>
                    {renderMangaByPopularity}
                    <Container>
                        <Link to="/topmanga/popularity"><Button className="top-list-button-manga" size="md">See more</Button></Link>
                    </Container>
                </Row>
                <p className='headers mt-4'>Top manga novels</p>
                <Row>
                    {renderMangaNovels}
                    <Container>
                        <Link to="/topmanga/novels"><Button className="top-list-button-manga" id="bottom-see-more-button-manga" size="md">See more</Button></Link>
                    </Container>
                </Row>
            </Container>
        </>
    )
}

export default MangaHome
