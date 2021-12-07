import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import {useGetData} from '../../Hooks/useGetData'
import Loading from '../Loading'

function TopAnimeByPopularityList() {

    const {data: anime, isLoading} = useGetData('https://api.jikan.moe/v3/top/anime/1/bypopularity')

    if (isLoading) return <Loading />

    const renderTopAnimeByPopularityList = anime.data.top.map(anime => {
        return (
            <tr key={anime.mal_id}>
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
