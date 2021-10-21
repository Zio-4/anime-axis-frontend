import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {useHistory, Link} from 'react-router-dom'

function MangaForum({user}) {
    const [mangaPosts, setMangaPosts] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        fetch("/forum_posts/manga")
        .then(r => r.json())
        .then(mangas => {
            console.log("manga forum posts in mangaForum", mangas)
            setMangaPosts(mangas)
        })
    }, [])

    function handleClick() {
        if (user) {
            history.push("/forums/newpost", {from: "manga forum"})
        } else {
            // Passing current page as props for rendering error on login page
            // Adding state of the current page
            history.push("/login", {from: "manga forum"})
        }
    }

    const renderMangaPosts = mangaPosts.map(m => (
            <tr key={m.id}>
                <td>
                <Link to={`/forums/post/${m.id}`}>{m.title}</Link>
                    <br/>
                    posted458 - Nov 12, 2020
                </td>
                <td>43</td>
                <td>Otto43</td>
            </tr>
        )   
    )

    return (
        <Container className="manga-forum-container">
            <h1>Manga Forum Board</h1>
            <Button onClick={handleClick}>Create New Post</Button>
            
            <Table striped bordered hover className="manga-forum-table">
                <thead>
                    <tr>
                    <th>Post</th>
                    <th>Comments</th>
                    <th>Last Comment</th>
                    </tr>
                </thead>
                <tbody>
                {renderMangaPosts}
                </tbody>
            </Table>
        </Container>
    )
}

export default MangaForum
