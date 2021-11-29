import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {useEffect, useState} from 'react'
import MangaCardByPopularity from './MangaCardByPopularity'
import MangaCardByScore from './MangaCardByScore'
import MangaCardNovels from './MangaCardNovels'
import MangaCardOneShots from './MangaCardOneShots'
import {Link, useHistory} from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {RiSearchLine} from "react-icons/ri";
import {useQuery} from 'react-query'
import axios from 'axios'
import Loading from '../Loading'

function MangaHome({onMangaSearch, updateMangaSearchQuery, mangaSearchQuery}) {
    const history = useHistory() 

    // fetching data functions

    const getTopMangaByScore = async () => {
        try {
            return await axios("https://api.jikan.moe/v3/top/manga/1/manga")
        } catch(error) {
            console.log(error.message)
        }
     }
     
     const getTopMangaByOneShots = async () => {
         try {
            return await axios("https://api.jikan.moe/v3/top/manga/1/oneshots")
         } catch(error) {
             console.log(error.message)
         }
     }
     
     const getTopMangaByPopularity = async () => {
         try {
            return await axios("https://api.jikan.moe/v3/top/manga/1/bypopularity")
         } catch(error) {
            console.log(error.message)
         }
     }
     
     const getTopMangaByNovels = async () => {
         try {
            return await axios("https://api.jikan.moe/v3/top/manga/1/novels")
         } catch(error) {
             console.log(error.message)
         }
     }

     // Using aliases to identify each fetches data by name
     
     const {data: mangaScore, isLoading: mangaScoreLoading} = useQuery('topMangaByScore', getTopMangaByScore)
     const {data: mangaOneShots, isLoading: mangaOneShotsLoading} = useQuery('topMangaByOneShots', getTopMangaByOneShots)
     const {data: mangaPopularity, isLoading: mangaPopularityLoading} = useQuery('topMangaByPopularity', getTopMangaByPopularity)
     const {data: mangaNovels, isLoading: mangaNovelsLoading} = useQuery('topMangaByNovels', getTopMangaByNovels)
 
     if (mangaScoreLoading) return <Loading /> 
     if (mangaOneShotsLoading) return <Loading />
     if (mangaPopularityLoading) return <Loading />
     if (mangaNovelsLoading) return <Loading />

    // update search state

    function handleChange(e) {
        updateMangaSearchQuery(mUV => e.target.value)
    }

    // Handle a search

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`https://api.jikan.moe/v3/search/manga?q=${mangaSearchQuery}&order_by=title&sort=asc&limit=10`)
        .then(r => r.json())
        .then(searchResultData => {
            console.log("search result data", searchResultData)
            onMangaSearch(searchResultData)
        })
        history.push(`/search/manga`)
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
                <p className='mt-4 text-center'>Top manga by score</p>
                <Row>
                    {renderMangaByScore}
                    <Container>
                        <Link to="/topmanga/score"><Button className="top-list-button-manga" size="md">See more</Button></Link>
                    </Container>
                </Row>
                <p className='mt-4 text-center'>Top manga one-shots</p>
                <Row>
                    {renderMangaOneShots}
                    <Container>
                        <Link to="/topmanga/oneshots"><Button className="top-list-button-manga" size="md">See more</Button></Link>
                    </Container>
                </Row>
                <p className='mt-4 text-center'>Top manga by popularity</p>
                <Row>
                    {renderMangaByPopularity}
                    <Container>
                        <Link to="/topmanga/popularity"><Button className="top-list-button-manga" size="md">See more</Button></Link>
                    </Container>
                </Row>
                <p className='mt-4 text-center'>Top manga novels</p>
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
