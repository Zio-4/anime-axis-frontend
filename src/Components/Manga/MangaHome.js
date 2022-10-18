import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link, useHistory } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { RiSearchLine } from "react-icons/ri";
import Loading from '../Loading'
import { useGetData } from '../../Hooks/useGetData'
import { useDispatch } from 'react-redux'
import { updateSearchQuery, updateSearchResults } from '../../Redux-Toolkit/search'
import axios from 'axios'
import Card from '../Card'
import { useQuery } from 'react-query' 

function MangaHome() {
    const [mangaSearchQuery, setMangaSearchQuery] = useState('')
    const history = useHistory()
    const dispatch = useDispatch() 

    // fetching data functions

    const mangaPopularityFetcher = async () => {
        let res = await axios('https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=6')
        return res
    }

    const mangaNovelsFetcher = async () => {
        let res = await axios('https://api.jikan.moe/v4/top/manga?type=novel&limit=6')
        return res
    }

     // Using aliases to identify each fetches data by name
     
     const {data: mangaScore, isLoading: mangaScoreLoading} = useGetData('https://api.jikan.moe/v4/top/manga?limit=6')
     const {data: mangaOneShots, isLoading: mangaOneShotsLoading, isSuccess} = useGetData('https://api.jikan.moe/v4/top/manga?type=oneshot&limit=6')

     const { data: mangaPopularity, isLoading: mangaPopularityLoading, isSuccess: mangaPopularitySuccess} = useQuery('mangaByPopularity', mangaPopularityFetcher, { enabled: isSuccess })
     const {data: mangaNovels, isLoading: mangaNovelsLoading} = useQuery('mangaByNovels', mangaNovelsFetcher, { enabled: mangaPopularitySuccess })
 
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
            let response = await axios(`https://api.jikan.moe/v4/manga?q=${mangaSearchQuery}&order_by=title&sort=asc&limit=10`)
            dispatch(updateSearchResults(response.data.data))
            history.push(`/search/manga`)
        } catch(error) {
            console.log(error)
        }
    }

    const renderMangaByScore = mangaScore.data.data.map(manga => {
        return (<Card key={manga.mal_id} title={manga.title} image={manga.images.jpg.image_url} id={manga.mal_id} path={`/manga/${manga.mal_id}`}/>)
    })

    const renderMangaOneShots = mangaOneShots.data.data.map(manga => {
        return (<Card key={manga.mal_id} title={manga.title} image={manga.images.jpg.image_url} id={manga.mal_id} path={`/manga/${manga.mal_id}`}/>)
    })    

    const renderMangaByPopularity = mangaPopularity.data.data.map(manga => {
        return (<Card key={manga.mal_id} title={manga.title} image={manga.images.jpg.image_url} id={manga.mal_id} path={`/manga/${manga.mal_id}`}/>)
    })

    const renderMangaNovels = mangaNovels.data.data.map(manga => {
        return (<Card key={manga.mal_id} title={manga.title} image={manga.images.jpg.image_url} id={manga.mal_id} path={`/manga/${manga.mal_id}`}/>)
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
                        <Link to={{ pathname: "/manga/top/score", state: { animeOrManga: 'manga', type: '', filter: ''}}}><Button className="top-list-button" size="md">See more</Button></Link>
                    </Container>
                </Row>
                <p className='headers mt-4'>Top manga one-shots</p>
                <Row>
                    {renderMangaOneShots}
                    <Container>
                        <Link to={{ pathname: "/manga/top/oneshots", state: { animeOrManga: 'manga', type: 'oneshot', filter: ''}}}><Button className="top-list-button" size="md">See more</Button></Link>
                    </Container>
                </Row>
                <p className='headers mt-4'>Top manga by popularity</p>
                <Row>
                    {renderMangaByPopularity}
                    <Container>
                        <Link to={{ pathname: "/manga/top/popularity", state: { animeOrManga: 'manga', type: '', filter: 'bypopularity'}}}><Button className="top-list-button" size="md">See more</Button></Link>
                    </Container>
                </Row>
                <p className='headers mt-4'>Top manga novels</p>
                <Row>
                    {renderMangaNovels}
                    <Container>
                        <Link to={{ pathname: "/manga/top/novels", state: { animeOrManga: 'manga', type: 'novel', filter: ''}}}><Button className="top-list-button" id="bottom-see-more-button-manga" size="md">See more</Button></Link>
                    </Container>
                </Row>
            </Container>
        </>
    )
}

export default MangaHome
