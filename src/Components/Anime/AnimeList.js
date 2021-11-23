import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import Loading from '../Loading'
import {Redirect} from 'react-router-dom'

function AnimeList({user, userData}) {
    const [animeList, setAnimeList] = useState([])
    const [errors, setErrors] = useState([])

    // useEffect(() => {
    //     fetch("/user")
    //     .then(r => {
    //         if (r.ok) {
    //             // If the response that is returned is not an error, parse it and turn it into JSON
    //             r.json().then(userData => {
    //             // Sort the user's anime list by title from A-Z
    //             const animesSortedByName = userData.animes.sort((a, b) => a.title.localeCompare(b.title))
    //             setAnimeList(animesSortedByName)
    //                 }
    //             )
    //         } else {
    //             r.json().then(err => {
    //                 setErrors(err.errors)
    //             })
    //         }
    //     }
    // )
        
    // }, [])

    useEffect(() => {
        // Sort the user's anime list by title from A-Z
        console.log("userData:", userData)
        console.log("user animes:", userData.animes)
        const animesSortedByName = userData.animes.sort((a, b) => a.title.localeCompare(b.title))
        setAnimeList(animesSortedByName)
    }, [])

    console.log(userData)

    if (errors.length > 0) return <Redirect to="/login" />
    if (!animeList) return <Loading/>

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
        }
    }

    const addAnimeToListMessage = () => {
        if (animeList.length === 0) {
            return <h2>There are no anime in your list. Go add some!</h2>
        } 
    }

    return (
        <Container className="users-anime-list">
            <header>
                <h1>{userData.username} anime list</h1>
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
