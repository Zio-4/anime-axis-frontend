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

function MangaHome({onMangaSearch, updateMangaSearchQuery, mangaSearchQuery}) {
    const [topMangaByScore, setTopMangaByScore] = useState([])
    const [topMangaOneShots, setTopMangaOneShots] = useState([])
    const [topMangaByPopularity, setTopMangaByPopularity] = useState([])
    const [topMangaNovels, setTopMangaNovels] = useState([])
    const history = useHistory() 

    function fetchTopMangaByScore() {
        fetch("https://api.jikan.moe/v3/top/manga/1/manga")
        .then(r => r.json())
        .then((manga) => {
            setTopMangaByScore(manga.top.slice(0,5))
        })
    }

    function fetchTopMangaOneShots() {
        fetch("https://api.jikan.moe/v3/top/manga/1/oneshots")
        .then(r => r.json())
        .then((manga) => {
            setTopMangaOneShots(manga.top.slice(0,5))
        })
    }

    function fetchTopMangaByPopularity() {
        fetch("https://api.jikan.moe/v3/top/manga/1/bypopularity")
        .then(r => r.json())
        .then((manga) => {
            setTopMangaByPopularity(manga.top.slice(0,5))
        })
    }

    function fetchTopMangaNovels() {
        fetch("https://api.jikan.moe/v3/top/manga/1/novels")
        .then(r => r.json())
        .then((manga) => {
            setTopMangaNovels(manga.top.slice(0,5))
        })
    }

    useEffect(() => {
        fetchTopMangaByScore()
        fetchTopMangaOneShots()
        fetchTopMangaByPopularity()
        fetchTopMangaNovels()
    }, [])

    function handleChange(e) {
        updateMangaSearchQuery(mUV => e.target.value)
    }

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

    const renderMangaByScore = topMangaByScore.map(manga => {
        return (<MangaCardByScore key={manga.mal_id} title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })

    const renderMangaOneShots = topMangaOneShots.map(manga => {
        return (<MangaCardOneShots key={manga.mal_id} title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })    

    const renderMangaByPopularity = topMangaByPopularity.map(manga => {
        return (<MangaCardByPopularity key={manga.mal_id} title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })

    const renderMangaNovels = topMangaNovels.map(manga => {
        return (<MangaCardNovels key={manga.mal_id} title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })



    return (
        <>
         <Container className="manga-search">
            <Row>
                <Col>
                    <input  type="text" value={mangaSearchQuery} onChange={handleChange} placeholder="eg. 'Naruto'"></input>
                    <button type="submit" onClick={handleSubmit} >Search</button>
                </Col>
            </Row>
        </Container>
        <Container fluid="md" className="manga-homepage-container">
            <p>Top manga by score</p>
            <Row>
                {renderMangaByScore}
                <Link to="/topmanga/score"><Button className="top-list-button" size="md">See more</Button></Link>
            </Row>
            <p>Top manga one-shots</p>
            <Row>
                {renderMangaOneShots}
                <Link to="/topmanga/oneshots"><Button className="top-list-button" size="md">See more</Button></Link>
            </Row>
            <p>Top manga by popularity</p>
            <Row>
                {renderMangaByPopularity}
                <Link to="/topmanga/popularity"><Button className="top-list-button" size="md">See more</Button></Link>
            </Row>
            <p>Top manga novels</p>
            <Row>
                {renderMangaNovels}
                <Link to="/topmanga/novels"><Button className="top-list-button" size="md">See more</Button></Link>
            </Row>
        </Container>
        </>
    )
}

export default MangaHome
