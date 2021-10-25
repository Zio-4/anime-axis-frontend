import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link, Redirect} from 'react-router-dom'
import Loading from '../Loading'

function AnimeList({user}) {

    if (!user) return <Loading/>

    let positionNumber = 0

    const renderUsersAnimeList = () => {
        if (user.animes) {
            user.animes.map(a => (
                <tr key={a.id}>
                    <td>
                        {positionNumber +=1}
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
        } else {
            return <h1>There are no anime in your list yet. Go add some!</h1>
        }
        
    }

    console.log(user.animes)

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
                    {renderUsersAnimeList()}
                </tbody>
            </Table>
        </Container>
    )
}

export default AnimeList
