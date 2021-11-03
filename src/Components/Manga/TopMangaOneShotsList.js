import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

function TopMangaOneShotsList() {
    const [topMangaOneShots, setTopMangaOneShots] = useState([])

    useEffect(() => {
        fetch("https://api.jikan.moe/v3/top/manga/1/oneshots")
        .then((r) => r.json())
        .then((data) => {
                setTopMangaOneShots(data.top)
                })
    }, [])

    const renderTopMangaOneShots = topMangaOneShots.map(manga => {
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
<Container className="top-manga-oneshots-list">
            <header>
                <h1>Top 50 manga one-shots</h1>
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
                    {renderTopMangaOneShots}
                </tbody>
            </Table>
        </Container>
    )
}

export default TopMangaOneShotsList
