import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

function TopMangaByPopularityList() {
    const [topMangaByPopularity, setTopMangaByPopularity] = useState([])

    useEffect(() => {
        fetch("https://api.jikan.moe/v3/top/manga/1/bypopularity")
        .then((r) => r.json())
        .then((data) => {
                setTopMangaByPopularity(data.top)
                })
    }, [])

    const renderTopMangaByPopularity = topMangaByPopularity.map(manga => {
        return (
            
            <tr>
                <td>
                    {manga.rank}
                </td>
                <td>
                    <Link to={`/manga/${manga.mal_id}`}>
                        <img src={manga.image_url} alt="manga art"/>
                        {manga.title}
                    </Link>
                </td>
                <td>
                    {manga.score}
                </td>
            </tr>
            
        )
    })

    return (
        <Container className="top-manga-popularity-list">
            <header>
                <h1>Top 50 manga by popularity</h1>
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
                    {renderTopMangaByPopularity}
                </tbody>
            </Table>
        </Container>
    )
}

export default TopMangaByPopularityList
