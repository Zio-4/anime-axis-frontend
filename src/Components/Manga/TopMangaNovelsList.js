import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import {useGetData} from '../../Hooks/useGetData'
import Loading from '../Loading'

function TopMangaNovelsList() {
    const {data: manga, isLoading} = useGetData('https://api.jikan.moe/v3/top/manga/1/novels')

    if (isLoading) return <Loading />

    const renderTopMangaNovels = manga.data.top.map(manga => {
        return (
            
            <tr key={manga.mal_id}>
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
