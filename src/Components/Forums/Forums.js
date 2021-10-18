import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

function Forums() {
    const [animeForumPosts, setAnimeForumPosts] = useState([])

    useEffect(() => {
        fetch("/forum_posts/anime")
        .then(r => r.json())
        .then(forumPostData => {
            console.log("Anime Forum Post Data:", forumPostData)
             setAnimeForumPosts(forumPostData)     
        })
    }, [])

    // Add content summary and posted date
    const renderAnimePosts = animeForumPosts.map(a => (
        <ListGroup.Item>{a.title}</ListGroup.Item>
    ))



    return (
        <div className="forum-component">
            <Container>
                <header>
                    <h1>Forums</h1>
                </header>
                    <Row>
                        <Card >
                        <Link to="/forums/anime"><Card.Header>Anime</Card.Header></Link>
                            <ListGroup variant="flush">
                                    {renderAnimePosts}
                            </ListGroup>
                        </Card>
                    </Row>
                    <Row>
                        <Card >
                            <Link to="/forums/manga"><Card.Header>Manga</Card.Header></Link>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Row>
                    <Row>
                        <Card>
                            <Link to="/forums/general"><Card.Header>General</Card.Header></Link>
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
