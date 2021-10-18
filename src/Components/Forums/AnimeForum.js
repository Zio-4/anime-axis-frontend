import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {useHistory} from 'react-router-dom'

function AnimeForum({user}) {
    const history = useHistory()

    function handleClick() {
        if (user) {
            history.push("/forums/anime/newpost")
        } else {
            // Passing current page as props for rendering error on login page
            // Adding state of the current page
            history.push("/login", {from: "anime forum"})
        }
    }

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
                    <tr>
                    <td>
                        What is your favorite Anime?
                        <br/>
                        posted458 - Nov 12, 2020
                    </td>
                    <td>43</td>
                    <td>Otto43</td>
                    </tr>

                    <tr>
                    <td>Most annoying anime character?</td>
                    <td>107</td>
                    <td>Thornton96x</td>
                    </tr>
                    
                    <tr>
                    <td>Strongest character in any anime?</td>
                    <td>9</td>
                    <td>philtered_soul</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
} 

export default AnimeForum
