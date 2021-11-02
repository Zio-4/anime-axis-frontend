import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import Loading from '../Loading'
import {Redirect} from 'react-router-dom'

function AnimeList({user}) {
    const [animeList, setAnimeList] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch("/user")
        .then(r => {
            if (r.ok) {
                r.json().then(userData => {
                const animesSortedByName = userData.animes.sort((a, b) => a.title.localeCompare(b.title))
                setAnimeList(animesSortedByName)
                    }
                )
            } else {
                r.json().then(err => {
                    setErrors(err.errors)
                })
            }
        }
    )
        
    }, [])

    if (errors.length > 0) return <Redirect to="/login" />
    if (!animeList) return <Loading/>
    
    

    console.log("anime list in animeList:", animeList)

    let positionNumber = 0

    const renderUsersAnimeList = () => {
        if (animeList.length > 0) {
           return animeList.map(a => (
               <tr key={a.id}>
                    <td>
                        {positionNumber +=1}
                    </td>
                    <td>  
                        <Link to={`/anime/${a.id}`}>
                            <img src={a.image_url} alt="anime art"/>
                        </Link>
                        {a.title}
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

    console.log(user)

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
