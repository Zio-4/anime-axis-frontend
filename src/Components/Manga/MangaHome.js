import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {useEffect, useState} from 'react'


function MangaHome() {
    const [topMangaByScore, setTopMangaByScore] = useState([])
    const [topMangaOneShots, setTopMangaOneShots] = useState([])
    const [topMangaByPopularity, setTopMangaByPopularity] = useState([])
    const [topMangaNovels, setTopMangaNovels] = useState([]) 

    function fetchTopMangaByScore() {
        fetch("https://api.jikan.moe/v3/top/manga/1/manga")
        .then(r => r.json())
        .then(manga => {
            console.log("manga by score:", manga)
            setTopMangaByScore(manga.top.slice(0,5))
        })
    }

    function fetchTopMangaOneShots() {
        fetch("https://api.jikan.moe/v3/top/manga/1/oneshots")
        .then(r => r.json())
        .then(manga => {
            console.log("manga oneshots:", manga)
            setTopMangaOneShots(manga.top.slice(0,5))
        })
    }

    function fetchTopMangaByPopularity() {
        fetch("https://api.jikan.moe/v3/top/manga/1/bypopularity")
        .then(r => r.json())
        .then(manga => {
            console.log("manga by popularity:", manga)
            setTopMangaByPopularity(manga.top.slice(0,5))
        })
    }

    function fetchTopMangaNovels() {
        fetch("https://api.jikan.moe/v3/top/manga/1/novels")
        .then(r => r.json())
        .then(manga => {
            console.log("manga by novels:", manga)
            setTopMangaNovels(manga.top.slice(0,5))
        })
    }

    useEffect(() => {
        fetchTopMangaByScore()
        fetchTopMangaOneShots()
        fetchTopMangaByPopularity()
        fetchTopMangaNovels()
    }, [])

    const renderMangaByScore = topMangaByScore.map(manga => {
        return (<MangaCardByScore title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })

    const renderMangaOneShots = topMangaOneShots.map(manga => {
        return (<MangaCardOneShots title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })    

    const renderMangaByPopularity = topMangaByPopularity.map(manga => {
        return (<MangaCardByPopularity title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })

    const renderMangaNovels = topMangaNovels.map(manga => {
        return (<MangaCardNovels title={manga.title} image={manga.image_url} id={manga.mal_id} />)
    })



    return (
        <Container fluid="md" className="mt-5">
            <Row>

            </Row>
            <Row>

            </Row>
            <Row>

            </Row>
            <Row>
                
            </Row>
        </Container>
    )
}

export default MangaHome
