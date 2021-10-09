import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import React from 'react'

function SignUp({setUser}) {
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        password_confirmation:"",
        email:""
    })
    const history = useHistory()

    function handleInput(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData
            ),
        })
        .then(r => r.json())
        .then(data => {
            setUser(data)
            setFormData({
                username:"",
                password:"",
                password_confirmation:"",
                email:""
            })
        })
        history.push("/")

    }


    return (
        <Form className="mt-5" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" value={formData.username} name="username" onChange={handleInput} placeholder="Enter Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={formData.password} name="password" onChange={handleInput} placeholder="Password" autoComplete="on"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value={formData.password_confirmation} name="password_confirmation" onChange={handleInput} placeholder="Confirm your password" autoComplete="on"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={formData.email} name="email" onChange={handleInput} placeholder="Enter email" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
        </Form>
    )
}

export default SignUp
