import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import {useParams} from 'react-router-dom'
import Loading from '../Loading'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Comment from './Comment'
import Row from 'react-bootstrap/Row'

function ForumPost({user}) {
    const [forumPost, setForumPost] = useState()
    const [comments, setComments] = useState([])
    const [show, setShow] = useState(false);
    const params = useParams()
    const [modalTextValue, setModalTextValue] = useState("")
    const [alertState, setAlertState] = useState(false)

    useEffect(() => {
        fetch(`/forum_posts/${params.id}`)
        .then(r => r.json())
        .then(post => {
            setForumPost(post)
        })
    }, [params.id])

    useEffect(() => {
        fetch(`/comments/${params.id}`) 
        .then(r => r.json())
        .then(commentData => {
            console.log("comments in ForumPost", commentData)
            setComments(commentData)
        })
    }, [comments.length])

    const handleClose = () => setShow(false);
    function handleShow() {
        if (user) {
            setShow(true)
        } else {
            setAlertState(true)
        }
    } 

    // Add time to comments

    const renderComments = comments.map(c => (
        <Comment key={c.id} content={c.content} userID={c.user_id} time={c.comment_time} username={c.user.username}/>
    ))

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                content: modalTextValue, forum_post_id: forumPost.id, user_id: user.id}
            ),
        })
        .then(r => r.json())
        .then(newComment => {
            console.log("returnedData", newComment)
            setModalTextValue("")
            setShow(false)
            setComments(((mUV) => [...comments, newComment]))
        })
    }


    if (!forumPost) return <Loading/>

    return (
        <div>
            <Container className="forum-post-container">
                <Button onClick={handleShow}>Comment on post</Button>
                {alertState ? <Alert variant="danger" className="forum-post-alert" onClose={() => setAlertState(false)} dismissible>You must first login to comment</Alert> : null}
                <Card>
                    <Card.Header>By {forumPost.user.username}</Card.Header>
                    <Card.Body>
                        <Card.Title>{forumPost.title}</Card.Title>
                        <Card.Text>
                            {forumPost.content}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">{forumPost.post_time}</Card.Footer>
                </Card>
            </Container>

            <Container >
                <Row className="d-flex justify-content-center">
                    {renderComments}
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body as="textarea" value={modalTextValue} onChange={(e) => setModalTextValue(e.target.value)}></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Post Comment
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ForumPost
