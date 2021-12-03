import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link, Redirect} from 'react-router-dom'


function MangaList({user}) {

    // Guard clause for returning jsx of undefined properties (user.username)
    if (!user) return <Redirect to="/login" />

    let positionNumber = 0

    const renderUsersMangaList = () => {
        if (user.data.mangas.length > 0) {
           return user.data.mangas.map(m => (
                <tr key={m.id}>
                    <td>
                        {positionNumber +=1}
                    </td>
                    <td>   
                        <Link to={`/manga/${m.id}`}>
                            <img src={m.image_url} alt="manga art"/>
                        </Link>
                        {m.title}  
                    </td>
                    <td>
                        {m.score}
                    </td>
                </tr>
            ))
        }
    }

    const addMangaToListMessage = () => {
        if (user.data.mangas.length === 0) {
            return <h2>There are no manga in your list. Go add some!</h2>
        } 
    }


    return (

        <Container className="users-manga-list">    
            <header>
                <h1>{user.data.username} manga list</h1>
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
                    {renderUsersMangaList()}
                </tbody>
            </Table>
            {addMangaToListMessage()}
        </Container>
    )
}

export default MangaList
