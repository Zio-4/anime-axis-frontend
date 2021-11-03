import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

function TopMangaNovelsList() {
    const [topMangaNovels, setTopMangaNovels] = useState([])

    useEffect(() => {
        fetch("https://api.jikan.moe/v3/top/manga/1/novels")
        .then((r) => r.json())
        .then((data) => {
                setTopMangaNovels(data.top)
                })
    }, [])

    const renderTopMangaNovels = topMangaNovels.map(manga => {
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
        <Container className="top-manga-novels-list">
            <header>
                <h1>Top 50 manga novels</h1>
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
                    {renderTopMangaNovels}
                </tbody>
            </Table>
        </Container>
    )
}

export default TopMangaNovelsList
