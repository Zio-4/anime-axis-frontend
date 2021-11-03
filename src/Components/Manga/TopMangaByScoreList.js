import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

function TopMangaByScoreList() {
    const [topMangaByScore, setTopMangaByScore] = useState([])

    useEffect(() => {
        fetch("https://api.jikan.moe/v3/top/manga/1/manga")
        .then((r) => r.json())
        .then((data) => {
                setTopMangaByScore(data.top)
                })
    }, [])

    const renderTopMangaByScore = topMangaByScore.map(manga => {
        return (
            <tr>
                <td>
                    {manga.rank}
                </td>
                <td>
                    <Link to={`/manga/${manga.mal_id}`}>
                        <img src={manga.image_url} alt="manga art"/>
                        
                    </Link>
                    {manga.title}
                </td>
                <td>
                    {manga.score}
                </td>
            </tr>
        )
    })

    return (
        <Container className="top-manga-score-list">
            <header>
                <h1>Top 50 manga by score</h1>
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
                    {renderTopMangaByScore}
                </tbody>
            </Table>
        </Container>
    )
}

export default TopMangaByScoreList
