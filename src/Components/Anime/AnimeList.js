import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

function AnimeList({user}) {

    // Guard clause for returning jsx of undefined properties (user.username)
    if (!user) return <Redirect to="/login" />


    let positionNumber = 0

    const renderUsersAnimeList = () => {
        if (user.data.animes.length > 0) {
           return user.data.animes.map(a => (
               <tr key={a.id}>
                    <td>
                        {positionNumber +=1}
                    </td>
                    <td>  
                        <Link to={`/anime/${a.id}`}>
                            <img src={a.image_url} alt="anime art"/>
                        </Link>
                        <div >{a.title}</div>
                    </td>
                    <td>
                        {a.score}
                    </td>
                </tr>
            ))
        }
    }

    const addAnimeToListMessage = () => {
        if (user.data.animes.length === 0) {
            return <h2>There are no anime in your list. Go add some!</h2>
        } 
    }

    return (
        <Container className="users-anime-list">
            <header>
                <h1>{user.data.username} anime list</h1>
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
            {addAnimeToListMessage()}
        </Container>
    )
}

export default AnimeList
