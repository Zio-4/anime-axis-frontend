import React from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {RiSearchLine} from "react-icons/ri";


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
            setSearchQuery("")
        })
    }


    const renderResultsFromSearchPage = searchResults.map(anime => (
        <Col xs={3} key={anime.mal_id}>
            <Card>
                <Link to={`/anime/${anime.mal_id}`}><Card.Img variant="top" src={anime.image_url} /></Link>
                <Card.Body>
                <Card.Title>{anime.title}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    ))

    const renderResultsFromHomepage = animeSearchResults.map(anime => (
        <Col xs={3} key={anime.mal_id}>
            <Card>
                <Link to={`/anime/${anime.mal_id}`}><Card.Img variant="top" src={anime.image_url} /></Link>
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


{/* <Col>
<input  type="text" value={searchQuery} onChange={handleChange} placeholder="eg. 'Naruto'"></input>
<button type="submit" onClick={handleSearch} >Search</button>
</Col> */}
