import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

function TopAnimeAiringList() {
    const [topAnimeAiring, setTopAnimeAiring] = useState([])

    useEffect(() => {
        fetch("https://api.jikan.moe/v3/top/anime/1/airing")
        .then((r) => r.json())
        .then((data) => {
                    setTopAnimeAiring(data.top)
                })
    }, [])

    const renderTopAnimeAiringList = topAnimeAiring.map(anime => {
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
        <Container className="top-anime-airing-list">
            <header>
                <h1>Top 50 anime currently airing</h1>
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
                    {renderTopAnimeAiringList}
                </tbody>
            </Table>
        </Container>
    )
}

export default TopAnimeAiringList
