import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'


function AnimePostForm({user}) {
    const [formData, setFormData] = useState({
        title:"",
        content:""
    })
    const history = useHistory()


    function handleSubmit(){
        fetch("/forum_posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                title: formData.content, content: formData.content, forum_id: 1, user_id: user.id
            }
            ),
        })
        .then(r => r.json())
        .then(returnedData => {
            setFormData({
                title:"",
                content:""
            })
            history.push(`/forums/anime/post/${returnedData.id}`)
        })
            
    }

    return (
        <Container className="anime-post-form-container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Post title</Form.Label>
                    <Form.Control type="email" placeholder="Why did the chicken cross the road?" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Post content</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="To get home and watch some anime obviously!"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AnimePostForm
