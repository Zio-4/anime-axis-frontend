import React from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import {useState} from 'react'



function AnimeSearchPage({animeSearchResults, animeSearchQuery}) {
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


    const renderResultsFromSearchPage = searchResults.map(anime => (
        <Col key={anime.mal_id}>
            <Card>
                <Card.Img variant="top" src={anime.image_url} />
                <Card.Body>
                <Card.Title>{anime.title}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    ))

    const renderResultsFromHomepage = animeSearchResults.map(anime => (
        <Col key={anime.mal_id}>
            <Card>
                <Card.Img variant="top" src={anime.image_url} />
                <Card.Body>
                <Card.Title>{anime.title}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
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
            <h1 className="mt-5">Showing results for: {searchQueryOnceSearched ? searchQueryOnceSearched : animeSearchQuery}</h1>
            <Container className="anime-search">
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

export default AnimeSearchPage
