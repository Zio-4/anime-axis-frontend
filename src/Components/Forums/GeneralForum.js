import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {useHistory, Link} from 'react-router-dom'


function GeneralForum({user}) {
    const [generalPosts, setGeneralPosts] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        fetch("/forum_posts/general")
        .then(r => r.json())
        .then(general => {
            console.log("general forum posts in generalForum", general)
            setGeneralPosts(general)
        })
    }, [])

    function handleClick() {
        if (user) {
            history.push("/forums/newpost", {from: "general forum"})
        } else {
            // Passing current page as props for rendering error on login page
            // Adding state of the current page
            history.push("/login", {from: "general forum"})
        }
    }

    const renderGeneralPosts = generalPosts.map(g => (
            <tr key={g.id}>
                <td>
                <Link to={`/forums/post/${g.id}`}>{g.title}</Link>
                    <br/>
                    posted458 - Nov 12, 2020
                </td>
                <td>43</td>
                <td>Otto43</td>
            </tr>
        )   
    )

    return (
        <Container className="general-forum-container">
            <h1>General Forum Board</h1>
            <Button onClick={handleClick}>Create New Post</Button>
            
            <Table striped bordered hover className="general-forum-table">
                <thead>
                    <tr>
                    <th>Post</th>
                    <th>Comments</th>
                    <th>Last Comment</th>
                    </tr>
                </thead>
                <tbody>
                {renderGeneralPosts}
                </tbody>
            </Table>
        </Container>
    )
}

export default GeneralForum
