import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

function TopAnimeUpcomingList() {
    const [topAnimeUpcoming, setTopAnimeUpcoming] = useState([])

    useEffect(() => {
        fetch("https://api.jikan.moe/v3/top/anime/1/upcoming")
        .then((r) => r.json())
        .then((data) => {
                setTopAnimeUpcoming(data.top)
                })
    }, [])

    const renderTopAnimeUpcomingList = topAnimeUpcoming.map(anime => {
        return ( 
            <tr>
                <td>
                    {anime.rank}
                </td>
                <td>
                    <Link to={`/anime/${anime.mal_id}`}>
                        <img src={anime.image_url} alt="anime art"/>
                        {anime.title}
                    </Link>
                </td>
                <td>
                    {anime.score}
                </td>   
            </tr>
        )
    })

    return (
        <Container className="top-anime-upcoming-list">
            <header>
                <h1>Top 50 upcoming anime</h1>
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
                    {renderTopAnimeUpcomingList}
                </tbody>
            </Table>
        </Container>
    )
}

export default TopAnimeUpcomingList
