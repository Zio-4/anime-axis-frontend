import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import {useParams} from 'react-router-dom'
import Loading from '../Loading'


function ForumPost() {
    const [forumPost, setForumPost] = useState()
    const params = useParams()

    useEffect(() => {
        fetch(`/forum_posts/${params.id}`)
        .then(r => r.json())
        .then(post => {
            console.log("post in forum post", post)
            setForumPost(post)
        })
    }, [params.id])

    // const renderComments = forumPost.comments.map(c => (
    //     <Comment key={c.id} />
    // ))

    if (!forumPost) return <Loading/>

    return (
        <Container className="forum-post-container">
            <Card>
                <Card.Header>By Username</Card.Header>
                <Card.Body>
                    <Card.Title>{forumPost.title}</Card.Title>
                    <Card.Text>
                        {forumPost.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        </Container>
    )
}

export default ForumPost
