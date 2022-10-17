import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import { useGetData } from '../Hooks/useGetData'
import Loading from './Loading'


const TopList = () => {
    const location = useLocation()
    const animeOrManga = location.state.animeOrManga
    const listType = location.state.type
    const listFilter = location.state.filter

    console.log('list type: ', listType)

    const {data: result, isLoading} = useGetData(`https://api.jikan.moe/v4/top/${animeOrManga}?type=${listType}&filter=${listFilter}`)

    if (isLoading) return <Loading />

    const renderResults = result.data.data.map((obj, i) => {
        return (
            <tr key={obj.mal_id}>
                <td>
                    {i + 1}
                </td>
                <td>
                    <Link to={`/${animeOrManga}/${obj.mal_id}`}>
                        <img src={obj.images.jpg.image_url} alt="manga art"/>
                        
                    </Link>
                    {obj.title}
                </td>
                <td>
                    {obj.score}
                </td>
            </tr>
        )
    })

    return (
        <Container className="top-manga-score-list">
            <header>
                <h1>Top 25 {animeOrManga} by {listFilter && listFilter === 'bypopularity' ? 'popularity' : listFilter || listType ? listType : 'score'}</h1>
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
                    {renderResults}
                </tbody>
            </Table>
        </Container>
    )
}

export default TopList