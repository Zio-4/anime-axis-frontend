import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link, Redirect} from 'react-router-dom'
import Loading from '../Loading'

function MangaList({user}) {
    const [mangaList, setMangaList] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch("/user")
        .then(r => {
            if (r.ok) {
                r.json().then(userData => {
                    const mangasSortedByName = userData.mangas.sort((a, b) => a.title.localeCompare(b.title))
                    setMangaList(mangasSortedByName)
                    }
                )
            } else {
                r.json().then(err => {
                    setErrors(err.errors)
                })
            }
        }
    
    )
            
    },[])

    if (errors.length > 0) return <Redirect to="/login"/>
    if (!mangaList) return <Loading/>

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
        } else {
            return <h1>There are no manga in your list yet. Go add some!</h1>
        }
    }


    return (

        <Container className="users-manga-list">    
            <header>
                <h1>{user.username} manga list</h1>
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
        </Container>
    )
}

export default MangaList
