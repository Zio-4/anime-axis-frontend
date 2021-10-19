import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {useHistory, Link} from 'react-router-dom'

function AnimeForum({user}) {
    const [animePosts, setAnimePosts] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        fetch("/forum_posts/anime")
        .then(r => r.json())
        .then(animes => {
            setAnimePosts(animes)
        })
    }, [])

    function handleClick() {
        if (user) {
            history.push("/forums/newpost")
        } else {
            // Passing current page as props for rendering error on login page
            // Adding state of the current page
            history.push("/login", {from: "anime forum"})
        }
    }
    
    const renderAnimePosts = animePosts.map(a => (
            
                <tr>
                    <td>
                    <Link to={`/forums/anime/post/${a.id}`}>{a.title}</Link>
                        <br/>
                        posted458 - Nov 12, 2020
                    </td>
                    <td>43</td>
                    <td>Otto43</td>
                </tr>
            
        )
    )

    return (
        <Container className="anime-forum-container">
            <h1>Anime Forum Board</h1>
           <Button onClick={handleClick}>Create New Post</Button>
            
            <Table striped bordered hover className="anime-forum-table">
                <thead>
                    <tr>
                    <th>Post</th>
                    <th>Comments</th>
                    <th>Last Comment</th>
                    </tr>
                </thead>
                <tbody>
                {renderAnimePosts}
                </tbody>
            </Table>
        </Container>
    )
} 

export default AnimeForum
