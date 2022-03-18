import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import {useParams} from 'react-router-dom'
import Loading from '../Loading'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Comment from './Comment'
import {useGetData} from '../../Hooks/useGetData'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

function ForumPost({user}) {
    const params = useParams()
    const [show, setShow] = useState(false);
    const [modalTextValue, setModalTextValue] = useState("")
    const [alertState, setAlertState] = useState(false)
    const queryClient = useQueryClient()

    const postNewComment = useMutation(addNewComment => {
        return axios.post('/api/comments', addNewComment)
    }, {onSuccess: (data) => {
            queryClient.setQueryData(`getData/api/comments/${params.id}`, (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data]
                }
            })
            setModalTextValue("")
            setShow(false)
        }
    }) 

    const { data: comments, isLoading: commentsIsLoading } = useGetData(`/api/comments/${params.id}`)
    const { data: forumPost, isLoading: forumPostIsLoading } = useGetData(`/api/forum_posts/${params.id}`)

    if (forumPostIsLoading) return <Loading />
    if (commentsIsLoading) return <Loading />


    const handleClose = () => setShow(false);
    function handleShow() {
        if (user) {
            setShow(true)
        } else {
            setAlertState(true)
        }
    } 


    const renderComments = comments.data.map(c => (
        <Comment key={c.id} content={c.content} time={c.comment_time} username={c.user.username}/>
    ))



    function handleSubmit(e) {
        e.preventDefault()
        postNewComment.mutate({content: modalTextValue, forum_post_id: forumPost.data.id, user_id: user.data.id})
    }


    return (
        <div>
            <Container className="forum-post-container">
                <Button onClick={handleShow} className="comment-button">Comment on post</Button>
                {alertState ? <Alert variant="danger" className="forum-post-alert" onClose={() => setAlertState(false)} dismissible>You must first login to comment</Alert> : null}
                <Card className="forum-post-card" border="dark">
                    <Card.Header>By {forumPost.data.user.username}</Card.Header>
                    <Card.Body>
                        <Card.Title>{forumPost.data.title}</Card.Title>
                        <Card.Text>
                            {forumPost.data.content}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">{forumPost.post_time}</Card.Footer>
                </Card>
            </Container>

            <Container className="comments-container"> 
                {renderComments}      
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
                    <Button variant="primary" type="submit" onClick={handleSubmit} className="comment-submit-button">
                        Post Comment
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ForumPost
