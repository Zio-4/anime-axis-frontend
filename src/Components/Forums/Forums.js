import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

function Forums() {
    const [animeForumPosts, setAnimeForumPosts] = useState([])
    const [mangaForumPosts, setMangaForumPosts] = useState([])
    const [generalForumPosts, setGeneralForumPosts] = useState([])

    function fetchRecentAnimeForumPosts() {
        fetch("/forum_posts/anime")
        .then(r => r.json())
        .then(forumPostData => {
             setAnimeForumPosts(forumPostData.slice(0,5))     
        })
    }

    function fetchRecentMangaForumPosts() {
        fetch("/forum_posts/manga")
        .then(r => r.json())
        .then(forumPostData => {
             setMangaForumPosts(forumPostData.slice(0,5))     
        })
    }

    function fetchRecentGeneralForumPosts() {
        fetch("/forum_posts/general")
        .then(r => r.json())
        .then(forumPostData => {
             setGeneralForumPosts(forumPostData.slice(0,5))     
        })
    }
    

    useEffect(() => {
        fetchRecentAnimeForumPosts()
        fetchRecentMangaForumPosts()
        fetchRecentGeneralForumPosts()
    }, [])

    // Add content summary and posted date
    const renderAnimePosts = animeForumPosts.map(a => (
        <ListGroup.Item key={a.id}>{a.title}</ListGroup.Item>
    ))

    const renderMangaPosts = mangaForumPosts.map(m => (
        <ListGroup.Item key={m.id}>{m.title}</ListGroup.Item>
    ))

    const renderGeneralPosts = generalForumPosts.map(g => (
        <ListGroup.Item key={g.id}>{g.title}</ListGroup.Item>
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
                                {renderMangaPosts}
                            </ListGroup>
                        </Card>
                    </Row>
                    <Row>
                        <Card>
                            <Link to="/forums/general"><Card.Header>General</Card.Header></Link>
                            <ListGroup variant="flush">
                                {renderGeneralPosts}
                            </ListGroup>
                        </Card>
                    </Row>
            </Container>
        </div>
    )
}

export default Forums
