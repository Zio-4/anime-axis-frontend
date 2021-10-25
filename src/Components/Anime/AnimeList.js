import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import Loading from '../Loading'

function AnimeList({user}) {

    if (!user) return <Loading />

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
