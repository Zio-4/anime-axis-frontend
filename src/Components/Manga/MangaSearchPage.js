import React, {useState} from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import {RiSearchLine} from "react-icons/ri";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'   

function MangaSearchPage({mangaSearchResults, mangaSearchQuery}) {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchQueryOnceSearched, setSearchQueryOnceSearched] = useState("")

    function handleChange(e) {
        setSearchQuery(mUV => e.target.value)
    }

    function handleSearch() {
        fetch(`https://api.jikan.moe/v3/search/manga?q=${searchQuery}&order_by=title&sort=asc&limit=10`)
        .then(r => r.json())
        .then(searchResultData => {
            setSearchResults(searchResultData.results)
            setSearchQueryOnceSearched(searchQuery)
            setSearchQuery("")
        })
    }


    const renderResultsFromMangaSearchPage = searchResults.map(m => (
        <OverlayTrigger key={m.mal_id} placement="top" overlay={
            <Tooltip>{m.title}</Tooltip>}>
            <Col xs={3} >
                <Card>
                <Link to ={`/manga/${m.mal_id}`}><Card.Img variant="top" src={m.image_url} /></Link>
                </Card>
            </Col>
        </OverlayTrigger>
    ))

    const renderResultsFromMangaHomepage = mangaSearchResults.map(m => (
        <OverlayTrigger key={m.mal_id} placement="top" overlay={
            <Tooltip>{m.title}</Tooltip>}>
            <Col xs={3} >
                <Card>
                <Link to ={`/manga/${m.mal_id}`}><Card.Img variant="top" src={m.image_url} /></Link>
                </Card>
            </Col>
        </OverlayTrigger>
    ))

    const render = () => {
        if (searchResults.length === 0) {
            return renderResultsFromMangaHomepage
        } else {
            return renderResultsFromMangaSearchPage
        }
    }

    return (
        <div>
            
            <Container className="manga-search">
                <Col style={{width: '22rem'}} className='mx-auto'>
                    <div className="searchbar">
                        <input type="text" className="search-input" value={searchQuery} onChange={handleChange} placeholder="eg. 'Naruto'"/>
                        <a   onClick={handleSearch} className="search-icon"><RiSearchLine/></a>
                    </div>
                </Col>
                <h1 className="mt-5">Showing results for: {searchQueryOnceSearched ? searchQueryOnceSearched : mangaSearchQuery}</h1>
            </Container>
            <Container className="d-flex justify-content-center">
                <Row>
                    {render()}
                </Row>
            </Container>
        </div>
    )
}

export default MangaSearchPage
