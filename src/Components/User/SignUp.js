import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'

function SignUp({setUserIsLoggedIn}) {
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        password_confirmation:""
    })
    const [errors, setErrors] = useState([])
    const history = useHistory()

    function handleInput(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (formData.password != formData.password_confirmation) {
                setErrors(["Password and Password confirmation do not match"])
                return
            }
            await axios.post('/signup', formData)
            setUserIsLoggedIn(true)
            setFormData({
                username:"",
                password:"",
                password_confirmation:""
            })
            history.push("/")
        } catch (error) {
            console.log("error:", error)
            console.log("error data:", error.response.data.errors)
            setErrors(error.response.data.errors)
        }
    }

    console.log(errors)



    return (
        <Container>
            <h2 className="signup-header">Create an account</h2>
            <Form className="sign-up-form-container" onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label className="signup-form-headers">Username</Form.Label>
                        <Form.Control type="username" value={formData.username} name="username" onChange={handleInput} placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label className="signup-form-headers">Password</Form.Label>
                        <Form.Control type="password" value={formData.password} name="password" onChange={handleInput} placeholder="Password" autoComplete="on"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                        <Form.Label className="signup-form-headers">Confirm Password</Form.Label>
                        <Form.Control type="password" value={formData.password_confirmation} name="password_confirmation" onChange={handleInput} placeholder="Confirm your password" autoComplete="on"/>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="signup-button mb-2">
                        Submit
                    </Button>
                    {errors.length > 0 ? errors.map(err => <Alert key={err} className="mt-2" variant="danger">{err}</Alert>) : null}
            </Form>
        </Container>
    )
}

export default SignUp
