import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import {useGetData} from '../../Hooks/useGetData'
import Loading from '../Loading'

function TopAnimeAiringList() {

    const {data: anime, isLoading} = useGetData('https://api.jikan.moe/v4/top/anime?filter=airing')

    console.log('anime data', anime)

    if (isLoading) return <Loading />

    const renderTopAnimeAiringList = anime.data.data.map((anime, i) => {
        return (      
            <tr key={anime.mal_id}>
                <td>
                    {i + 1}
                </td>
                <td>
                    <Link to={`/anime/${anime.mal_id}`}>
                        <img src={anime.images.jpg.image_url} alt="anime art"/>
                        
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
                <h1>Top 25 anime currently airing</h1>
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
