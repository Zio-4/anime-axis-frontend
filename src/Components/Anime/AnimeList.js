import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import Loading from '../Loading'

function AnimeList() {
    const [user, setUser] = useState()
    
    useEffect(() => {
        fetch("/user")
        .then(r => r.json())
        .then(userData => {
            setUser(userData)
        })
      }, [])

    const renderUsersAnimeList = user.animes.map(a => (
        <tr key={a.id}>
            <td>
                1
            </td>
            <td>
                <Link to={`/anime/${a.id}`}>
                    <img src={a.image_url} />
                    {a.title}
                </Link>
            </td>
            <td>
                {a.score}
            </td>
        </tr>
    ))

    if (!user) return <Loading />

    return (
        <Container className="users-anime-list">
            <header>
                <h1>{user.username} anime list</h1>
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
                    {renderUsersAnimeList}
                </tbody>
            </Table>
        </Container>
    )
}

export default AnimeList
