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
import { useSelector, useDispatch } from 'react-redux'
import { updateSearchQuery, updateSearchResults } from '../../Redux-Toolkit/search'
import Loading from '../Loading'


function AnimeSearchPage() {
    const [animeSearchQuery, setAnimeSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { searchQuery } = useSelector(state => state.search)
    const { searchResults } = useSelector(state => state.search)
    const dispatch = useDispatch()


    const handleChange = (e) => {
        setAnimeSearchQuery(e.target.value)
    }

    const handleSearch = async () => {
        setIsLoading(true)
        dispatch(updateSearchQuery(animeSearchQuery))
        dispatch(updateSearchResults([]))
        let response = await axios(`https://api.jikan.moe/v4/anime?q=${animeSearchQuery}&order_by=title&sort=asc&limit=10`)
        setIsLoading(false)
        dispatch(updateSearchResults(response.data.data))
        setAnimeSearchQuery("")
    }

    const renderResults = searchResults.map(anime => (
        <OverlayTrigger key={anime.mal_id} placement="top" overlay={
            <Tooltip>{anime.title}</Tooltip>}>
            <Col xs={6} sm={2} med={4}>
                <Card className='mainpage-cards search-cards'>
                    <Link to={`/anime/${anime.mal_id}`}><Card.Img className='mainpage-card-images' variant="top" src={anime.images.jpg.image_url} /></Link>
                </Card> 
            </Col>
        </OverlayTrigger>
    ))

    return (
        <div>
            <Container className="anime-search">
                <Col style={{width: '22rem'}} className='mx-auto'>
                    <div className="searchbar">
                        <input type="text" className="search-input" value={animeSearchQuery} onChange={handleChange} placeholder="eg. 'Naruto'"/>
                        <div onClick={handleSearch} className="search-icon"><RiSearchLine/></div>
                    </div>
                </Col>

                <h1 className="mt-5">Showing results for: {searchQuery}</h1>
            </Container>
            <Container >
                <Row> 
                    {renderResults}
                    {isLoading ? <Loading /> : null}
                </Row>
            </Container>
        </div>
    )
}

export default AnimeSearchPage

