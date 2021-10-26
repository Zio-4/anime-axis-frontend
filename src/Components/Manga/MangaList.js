import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import Loading from '../Loading'

function MangaList({user}) {
    const [mangaList, setMangaList] = useState([])

    useEffect(() => {
        fetch("/user")
        .then(r => r.json())
        .then(userData => {
            setMangaList(userData.mangas)
        })
    },[])

    if (!mangaList) return <Loading/>

    console.log("user mangas", mangaList)

    let positionNumber = 0

    const renderUsersMangaList = () => {
        if (mangaList) {
           return mangaList.map(m => (
                <tr key={m.id}>
                    <td>
                        {positionNumber +=1}
                    </td>
                    <td>
                        <Link to={`/manga/${m.id}`}>
                            <img src={m.image_url} alt="manga art"/>
                            {m.title}
                        </Link>
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
