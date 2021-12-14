import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import loginIcon from '../../Images/user.svg'
import sasuke from '../../Images/Sasuke.png'
import {Link, useHistory} from 'react-router-dom'
import {useState} from 'react'
import React from 'react'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'


function Login({setUserIsLoggedIn}) {
    const [formData, setFormData] = useState({
        username:"",
        password:""
    })
    const [errors, setErrors] = useState([])

    const history = useHistory()

    function handleInput(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    async function handleLogin(e) {
        e.preventDefault()
        try {
            // if (!formData) {
            //     throw new Error("Please enter your login information")
            // }
            // // if (!formData.password) {
            // //     throw new Error("Please enter your password")
            // // }
            // // if (!formData.username) {
            // //     throw new Error("Please enter your username")
            // // }
            await axios.post('/login', formData)
            setUserIsLoggedIn(true)
            history.push("/")
        } catch (error) {
            console.log("error.message:", error.message)
            console.log("error.response:", error.response)
            // if (error.message) {
            //     // setErrors(error.message)
            // } else {
            //     setErrors(error.response.data.message)
            // }
            setErrors(error.response.data.message)
        }
        
    }    

    return (
        <Container className="login-container">
            <Row>
                <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
                    <img className="icon-img" src={loginIcon} alt="icon"/>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Control type="username" name="username" value={formData.username} onChange={handleInput} placeholder="Username"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleInput} placeholder="Password"/>
                        </Form.Group>
                        <div className="d-grid gap-2">
                        <Button id="login-button" variant="btn-block" type="submit">Login</Button>
                        </div>

                        <div className="signup-link mt-3">
                            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                            {history.location.state === undefined ? null : <Alert variant="danger" className="forum-post-alert">You must first login to see this page</Alert>} 
                            {errors.length > 0 ? <Alert variant="danger" className="text-center">{errors.length > 0 ? errors : null }</Alert> : null}       
                        </div>
                    </Form>
                </Col>

                <Col lg={8} md={6} sm={12}>
                    <img className="w-100" src={sasuke} alt="sasuke" />
                </Col>
                
            </Row>
        </Container>
    )
}

export default Login
