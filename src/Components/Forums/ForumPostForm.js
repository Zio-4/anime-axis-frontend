import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'


function ForumPostForm({user}) {
    const [formData, setFormData] = useState({
        title:"",
        content:""
    })
    const [forumIdState, setForumIdState] = useState(1)
    const history = useHistory()


    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if (history.location.state === undefined) {
            setForumIdState(1)
        } else if (history.location.state.from === "manga forum") {
            setForumIdState(2)
        } else if (history.location.state.from === "general forum"){
            setForumIdState(3)
        }
    }, [history.location.state])


    function handleSubmit(e){
        e.preventDefault()
        fetch("/forum_posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                title: formData.title, content: formData.content, forum_id: forumIdState, user_id: user.id}
            ),
        })
        .then(r => r.json())
        .then(returnedData => {
            console.log("returnedData", returnedData)
            setFormData({
                title:"",
                content:""
            })
            history.push(`/forums/post/${returnedData.id}`)
        })
            
    }

    return (
        <Container className="anime-post-form-container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Post title</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="title" value={formData.title} placeholder="Why did the chicken cross the road?" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Post content</Form.Label>
                    <Form.Control as="textarea" onChange={handleChange} name="content" value={formData.content} rows={3} placeholder="To get home and watch some anime obviously!"/>
                </Form.Group>
                <Button variant="primary" type="submit" className="forum-post-submit-button">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default ForumPostForm
