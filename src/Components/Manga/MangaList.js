import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link, Redirect} from 'react-router-dom'
import Loading from '../Loading'

function MangaList({user}) {
    const [mangaList, setMangaList] = useState([])

    useEffect(() => {      
        // Guard clause for sort error
        if (!user) return <Redirect to="/login" />
        // Sort the user's manga list by title from A-Z
        const mangasSortedByName = user.data.mangas.sort((a, b) => a.title.localeCompare(b.title))
        setMangaList(mangasSortedByName)
    }, [])

    // Guard clause for returning jsx of undefined properties (user.username)
    if (!user) return <Redirect to="/login" />

    let positionNumber = 0

    const renderUsersMangaList = () => {
        if (mangaList.length > 0) {
           return mangaList.map(m => (
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
        if (mangaList.length === 0) {
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
