import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import loginIcon from '../../Images/user.svg'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {Link, Redirect} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

function ProfilePage({user}) {
    const [bio, setBio] = useState(user.bio)
    const [show, setShow] = useState(false);
    const [modalTextValue, setModalTextValue] = useState("")
    const [alertState, setAlertState] = useState(false)

    const handleClose = () => {
        setShow(false)
        setModalTextValue("")
    }
    const handleShow = () => setShow(true)

    function handleSubmit() {
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({bio: modalTextValue || user.bio})
        })
        .then(r => r.json())
        .then(userData => {
            console.log(userData)
            setBio(userData.bio)
            setShow(false)
            setAlertState(true)
        })
    }

    if (!user) return <Redirect to="/login"/>

    // center buttons

    return (
        <Container className="profile-container">
            <Row className="d-flex justify-content-center"> 
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={user.avatar === null ? loginIcon : user.avatar} id="profile-icon" alt="profile-icon" />
                    <Card.Body>
                        <Card.Title>{user.username}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">                
                        <ListGroup.Item> <strong>Bio:</strong> {user.bio && bio === undefined ? user.bio : bio}</ListGroup.Item>
                        <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                    </ListGroup>
                </Card>
                <div className="d-grid gap-2 mt-2 justify-content-center">
                    {user.bio ? <Button variant="primary" size="sm" style={{width: '18rem'}} onClick={handleShow}>Update bio</Button> : <Button variant="primary" size="sm" style={{width: '18rem'}} onClick={handleShow}>
                        Add bio
                    </Button>}
                    <Button variant="primary" size="sm" style={{width: '18rem'}}>
                        Add avatar
                    </Button>

                    {alertState ? <Alert variant="success" className="text-center" onClose={() => setAlertState(false)} dismissible>Bio has been updated</Alert> : null}
                </div>
            </Row>

           

            <Modal show={show} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Bio</Modal.Title>
                </Modal.Header>
                <Modal.Body as="textarea" value={modalTextValue} onChange={(e) => setModalTextValue(e.target.value)}></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ProfilePage

{/* <Button className="mt-2" >Add Bio</Button>
<Button className="mt-2" style={{ width: '18rem' }}>Add Avatar</Button> */}