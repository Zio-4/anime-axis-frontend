import React, {useState} from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

function MangaSearchPage({mangaSearchResults, mangaSearchQuery}) {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchQueryOnceSearched, setSearchQueryOnceSearched] = useState("")

    function handleChange(e) {
        setSearchQuery(mUV => e.target.value)
    }

    function handleSearch() {
        fetch(`https://api.jikan.moe/v3/search/anime?q=${searchQuery}&order_by=title&sort=asc&limit=10`)
        .then(r => r.json())
        .then(searchResultData => {
            setSearchResults(searchResultData.results)
            setSearchQueryOnceSearched(searchQuery)
        })
    }


    const renderResultsFromMangaSearchPage = searchResults.map(m => (
        <Col key={m.mal_id}>
            <Card>
            <Link to ={`/manga/${m.mal_id}`}><Card.Img variant="top" src={m.image_url} /></Link>
                <Card.Body>
                <Card.Title>{m.title}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    ))

    const renderResultsFromMangaHomepage = mangaSearchResults.map(m => (
        <Col key={m.mal_id}>
            <Card>
            <Link to ={`/manga/${m.mal_id}`}><Card.Img variant="top" src={m.image_url} /></Link>
                <Card.Body>
                <Card.Title>{m.title}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
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
            <h1 className="mt-5">Showing results for: {searchQueryOnceSearched ? searchQueryOnceSearched : mangaSearchQuery}</h1>
            <Container className="manga-search">
                <Row>
                    <Col>
                        <input  type="text" value={searchQuery} onChange={handleChange} placeholder="eg. 'Naruto'"></input>
                        <button type="submit" onClick={handleSearch} >Search</button>
                    </Col>
                </Row>
            </Container>
                <Row>
                    <CardGroup>
                        {render()}
                    </CardGroup>
                </Row>
        </div>
    )
}

export default MangaSearchPage
