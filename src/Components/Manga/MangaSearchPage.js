import React, {useState} from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import {RiSearchLine} from "react-icons/ri";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'   
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { updateSearchQuery, updateSearchResults } from '../../Redux-Toolkit/search'
import Loading from '../Loading'

function MangaSearchPage() {
    const [mangaSearchQuery, setMangaSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { searchQuery } = useSelector(state => state.search)
    const { searchResults } = useSelector(state => state.search)

    function handleChange(e) {
        setMangaSearchQuery(e.target.value)
    }

    const handleSearch = async () => {
        setIsLoading(true)
        dispatch(updateSearchQuery(mangaSearchQuery))
        dispatch(updateSearchResults([]))
        let response = await axios(`https://api.jikan.moe/v3/search/manga?q=${mangaSearchQuery}&order_by=title&sort=asc&limit=10`)
        setIsLoading(false)
        dispatch(updateSearchResults(response.data.results))
        setMangaSearchQuery("")
    }


    const renderResults = searchResults.map(m => (
        <OverlayTrigger key={m.mal_id} placement="top" overlay={
            <Tooltip>{m.title}</Tooltip>}>
            <Col xs={6} sm={2} med={4}>
                <Card className='mainpage-cards search-cards'>
                    <Link to ={`/manga/${m.mal_id}`}><Card.Img className='mainpage-card-images' variant="top" src={m.image_url} /></Link>
                </Card>
            </Col>
        </OverlayTrigger>
    ))


    return (
        <div>
            
            <Container className="manga-search">
                <Col style={{width: '22rem'}} className='mx-auto'>
                    <div className="searchbar">
                        <input type="text" className="search-input" value={mangaSearchQuery} onChange={handleChange} placeholder="eg. 'Naruto'"/>
                        <a   onClick={handleSearch} className="search-icon"><RiSearchLine/></a>
                    </div>
                </Col>
                <h1 className="mt-5">Showing results for: {searchQuery}</h1>
            </Container>
            <Container className="d-flex justify-content-center">
                <Row>
                    {renderResults}
                    {isLoading ? <Loading /> : null}
                </Row>
            </Container>
        </div>
    )
}

export default MangaSearchPage
