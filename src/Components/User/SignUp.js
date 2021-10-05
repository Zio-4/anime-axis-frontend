import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

function SignUp() {
    return (
<Form>
        <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password-confirmation" placeholder="Confirm your password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
</Form>
    )
}

export default SignUp
