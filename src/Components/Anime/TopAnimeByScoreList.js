import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import {useGetData} from '../../Hooks/useGetData'
import Loading from '../Loading'

function TopAnimeByScoreList() {

    const {data: anime, isLoading} = useGetData('https://api.jikan.moe/v4/top/anime?type=tv')

    if (isLoading) return <Loading />

    console.log('anime data: ', anime.data.data)

    const renderTopAnimeByScore = anime.data.data.map((anime, i) => {
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
<Container className="top-anime-score-list">
            <header>
                <h1>Top 25 anime by score</h1>
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
                    {renderTopAnimeByScore}
                </tbody>
            </Table>
        </Container>
    )
}

export default TopAnimeByScoreList
