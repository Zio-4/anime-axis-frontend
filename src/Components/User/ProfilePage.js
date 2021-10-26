import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import loginIcon from '../../Images/user.svg'
import Button from 'react-bootstrap/Button'
import {Redirect} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

function ProfilePage({user}) {
    const [bio, setBio] = useState(user.bio)
    const [avatar, setAvatar] = useState(user.avatar)
    const [showBioModal, setShowBioModal] = useState(false);
    const [showAvatarModal, setAvatarModal] = useState(false)
    const [avatarModalValue, setAvatarModalValue] = useState("")
    const [bioModalTextValue, setBioModalTextValue] = useState("")
    const [bioAlertState, setBioAlertState] = useState(false)
    const [avatarAlertState, setAvatarAlertState] = useState(false)

    if (!user) return <Redirect to="/login"/>

    const handleCloseBio = () => {
        setShowBioModal(false)
        setBioModalTextValue("")
    }

    const handleShowBio = () => setShowBioModal(true)


    const handleCloseAvatar = () => {
        setAvatarModal(false)
        setAvatarModalValue("")
    }

    const handleShowAvatar = () => setAvatarModal(true)

   

    function handleSubmitBio() {
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({bio: bioModalTextValue || user.bio})
        })
        .then(r => r.json())
        .then(userData => {
            console.log(userData)
            setBio(userData.bio)
            setBioModalTextValue("")
            setBioAlertState(true)
        })
    }

    function handleSubmitAvatar() {
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({avatar: avatarModalValue || user.avatar})
        })
        .then(r => r.json())
        .then(userData => {
            console.log(userData)
            setAvatar(userData.avatar)
            setAvatarModalValue(false)
            setAvatarAlertState(true)
        })
    }


    


    return (
        <Container className="profile-container">
            <Row className="d-flex justify-content-center"> 
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={user.avatar && avatar === undefined ? user.avatar : avatar} id="profile-icon" alt="profile-icon" />
                    <Card.Body>
                        <Card.Title>{user.username}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">                
                        <ListGroup.Item> <strong>Bio:</strong> {user.bio && bio === undefined ? user.bio : bio}</ListGroup.Item>
                    </ListGroup>
                </Card>
                <div className="d-grid gap-2 mt-2 justify-content-center">
                    {user.bio ? <Button variant="primary" size="sm" style={{width: '18rem'}} onClick={handleShowBio}>Update bio</Button> : <Button variant="primary" size="sm" style={{width: '18rem'}} onClick={handleShowBio}>
                        Add bio
                    </Button>}
                    <Button variant="primary" size="sm" style={{width: '18rem'}} onClick={handleShowAvatar}>
                        Add avatar
                    </Button>

                    {bioAlertState ? <Alert variant="success" className="text-center" onClose={() => setBioAlertState(false)} dismissible>Bio has been updated</Alert> : null}
                    {avatarAlertState ? <Alert variant="success" className="text-center" onClose={() => setAvatarAlertState(false)} dismissible>Avatar has been updated</Alert> : null}
                </div>
            </Row>

           

            <Modal show={showBioModal} onHide={handleCloseBio} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Bio</Modal.Title>
                </Modal.Header>
                <Modal.Body as="textarea" value={bioModalTextValue} onChange={(e) => setBioModalTextValue(e.target.value)}></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBio}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitBio}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAvatarModal} onHide={handleCloseAvatar} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enter url for avatar image</Modal.Title>
                </Modal.Header>
                <Modal.Body as="textarea" value={avatarModalValue} onChange={(e) => setAvatarModalValue(e.target.value)}></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAvatar}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitAvatar}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ProfilePage

