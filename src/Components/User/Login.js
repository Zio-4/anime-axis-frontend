import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import loginIcon from '../../Images/user.svg'
import sasuke from '../../Images/Sasuke.png'
import {Link} from 'react-router-dom'

function Login() {
    return (
        <Container className="login-container">
            <Row>
                <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
                    <img className="icon-img" src={loginIcon} alt="icon"/>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="username" placeholder="Username"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                        <div className="d-grid gap-2">
                        <Button id="login-button" variant="btn-block" type="submit">Login</Button>
                        </div>

                        <div className="signup-link mt-3">
                            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                            
                        </div>
                    </Form>
                </Col>

                <Col lg={8} md={6} sm={12}>
                    <img className="w-100" src={sasuke} alt="" />
                </Col>
            </Row>
        </Container>
    )
}

export default Login
