import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import {useEffect, useState} from 'react'

function Forums() {
    const [forumPosts, setForumPosts] = useState([])

    // Create custom method in backend for the 5 newest posts?

    // useEffect(() => {
    //     fetch("/forums_posts")
    //     .then(r => r.json())
    //     .then(forumPostData => {
    //         console.log("Forum Post Data:", forumPostData)
    //          setForumPosts(forumPostData)     
    //     })
    // }, [])

    return (
        <div className="forum-component">
            <Container>
                <header>
                    <h1>Forums</h1>
                </header>
                    <Row>
                        <Card >
                            <Card.Header>Anime</Card.Header>
                            <ListGroup variant="flush">
                                    {/* <ListGroup.Item>{title} {content_summary} {posted}</ListGroup.Item>
                                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
                            </ListGroup>
                        </Card>
                    </Row>
                    <Row>
                        <Card >
                            <Card.Header>Manga</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Row>
                    <Row>
                        <Card >
                            <Card.Header>General</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Row>
            </Container>
        </div>
    )
}

export default Forums
