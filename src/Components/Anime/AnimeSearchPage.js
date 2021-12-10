import React from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {RiSearchLine} from "react-icons/ri";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import axios from 'axios'


function AnimeSearchPage({animeSearchResults, animeSearchQuery}) {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchQueryOnceSearched, setSearchQueryOnceSearched] = useState("")

    function handleChange(e) {
        setSearchQuery(mUV => e.target.value)
    }

    async function handleSearch() {
        let response = await axios(`https://api.jikan.moe/v3/search/anime?q=${searchQuery}&order_by=title&sort=asc&limit=10`)
        setSearchResults(response.data.results)
        setSearchQueryOnceSearched(searchQuery)
        setSearchQuery("")
    }

    const renderResultsFromSearchPage = searchResults.map(anime => (
        <OverlayTrigger key={anime.mal_id} placement="top" overlay={
            <Tooltip>{anime.title}</Tooltip>}>
        <Col xs={3} >
            <Card>
                <Link to={`/anime/${anime.mal_id}`}><Card.Img variant="top" src={anime.image_url} /></Link>
            </Card> 
        </Col>
        </OverlayTrigger>
    ))

    const renderResultsFromHomepage = animeSearchResults.map(anime => (
        <OverlayTrigger key={anime.mal_id} placement="top" overlay={
            <Tooltip>{anime.title}</Tooltip>}>
        <Col xs={3} >
            <Card>
                <Link to={`/anime/${anime.mal_id}`}><Card.Img variant="top" src={anime.image_url} /></Link>
            </Card> 
        </Col>
        </OverlayTrigger>
    ))

    const render = () => {
        if (searchResults.length === 0) {
            return renderResultsFromHomepage
        } else {
            return renderResultsFromSearchPage
        }
    }

    return (
        <div>
            <Container className="anime-search">
                <Col style={{width: '22rem'}} className='mx-auto'>
                    <div className="searchbar">
                        <input type="text" className="search-input" value={searchQuery} onChange={handleChange} placeholder="eg. 'Naruto'"/>
                        <a onClick={handleSearch} className="search-icon"><RiSearchLine/></a>
                    </div>
                </Col>

                <h1 className="mt-5">Showing results for: {searchQueryOnceSearched ? searchQueryOnceSearched : animeSearchQuery}</h1>
            </Container>
            <Container className="d-flex justify-content-center">
                <Row> 
                    {render()}
                </Row>
            </Container>
        </div>
    )
}

export default AnimeSearchPage

