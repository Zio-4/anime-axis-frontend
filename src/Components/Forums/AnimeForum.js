import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'

function AnimeForum() {



    return (
        <Container className="anime-forum-container">
            <h1>Anime Forum Board</h1>
            <Link to="/forums/anime/newpost"><Button>Create New Post</Button></Link>
            
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
