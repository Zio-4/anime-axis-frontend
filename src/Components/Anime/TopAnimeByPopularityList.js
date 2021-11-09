import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

function TopAnimeByPopularityList() {
    const [topAnimeByPopularity, setTopAnimeByPopularity] = useState([])

    useEffect(() => {
        fetch("https://api.jikan.moe/v3/top/anime/1/bypopularity")
        .then((r) => r.json())
        .then((data) => {
                setTopAnimeByPopularity(data.top)
                })
    }, [])

    const renderTopAnimeByPopularityList = topAnimeByPopularity.map(anime => {
        return (
            <tr>
                <td>
                    {anime.rank}
                </td>
                <td>
                    <Link to={`/anime/${anime.mal_id}`}>
                        <img src={anime.image_url} alt="anime art"/>
                        
                    </Link>
                    {anime.title}
                </td>
                <td>
                    {anime.score}
                </td>
            </tr>
        )
    })
    return (
        <Container className="top-anime-popularity-list">
            <header>
                <h1>Top 50 anime by popularity</h1>
            </header>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTopAnimeByPopularityList}
                </tbody>
            </Table>
        </Container>
    )
}

export default TopAnimeByPopularityList
