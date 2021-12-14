import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import loginIcon from '../../Images/user.svg'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

function ProfilePage({user}) {
    const [showBioModal, setShowBioModal] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false)
    const [avatarModalValue, setAvatarModalValue] = useState("")
    const [bioModalTextValue, setBioModalTextValue] = useState("")
    const [bioAlertState, setBioAlertState] = useState(false)
    const [avatarAlertState, setAvatarAlertState] = useState(false)
    const queryClient = useQueryClient()

    const updateBio = useMutation(editBio => {
        return axios.patch(`/users/${user.data.id}`, editBio)
    }, {onSuccess: (data) => {
            console.log("data in onSuccess:", data)
            queryClient.setQueryData('getData/user', data)
            setShowBioModal(false)
            setBioModalTextValue("")
            setBioAlertState(true)
            },
        onError: (error) => console.log(error.message)
        }
    )

    const updateAvatar = useMutation(editAvatar => {
        return axios.patch(`/users/${user.data.id}`, editAvatar)
    }, {
        onSuccess: data => {
            console.log("Data in onSuccess:", data)
            queryClient.setQueryData('getData/user', data)
            setShowAvatarModal(false)
            setAvatarModalValue("")
            setAvatarAlertState(true)
        },
        onError: error => console.log(error.message)
    })


    const handleCloseBio = () => {
        setShowBioModal(false)
        setBioModalTextValue("")
    }

    const handleShowBio = () => setShowBioModal(true)


    const handleCloseAvatar = () => {
        setShowAvatarModal(false)
        setAvatarModalValue("")
    }

    const handleShowAvatar = () => setShowAvatarModal(true)


    function handleEditBio() {
        updateBio.mutate({bio: bioModalTextValue || user.data.bio})
    }

    function handleEditAvatar() {
        updateAvatar.mutate({avatar: avatarModalValue || user.data.avatar})
    }

    if (!user) return <Redirect to="/login"/>  


    return (
        <Container className="profile-container">
            <Row className="d-flex justify-content-center"> 
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={user.data.avatar ? user.data.avatar : loginIcon} id="profile-icon" alt="profile-icon" />
                    <Card.Body>
                        <Card.Title>{user.data.username}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">                
                        <ListGroup.Item> <strong>Bio:</strong> {user.data.bio ? user.data.bio : null}</ListGroup.Item>
                    </ListGroup>
                </Card>
                <div className="d-grid gap-2 mt-2 justify-content-center">
                    {user.data.bio ? <Button variant="primary" size="sm" style={{width: '18rem'}} onClick={handleShowBio} className="profile-buttons">Update bio</Button> : <Button variant="primary" size="sm" style={{width: '18rem'}} onClick={handleShowBio} className="profile-buttons">Add bio</Button>}
                    {user.data.avatar ? <Button variant="primary" size="sm" style={{width: '18rem'}} onClick={handleShowAvatar} className="profile-buttons">Update avatar</Button> : <Button variant="primary" size="sm" style={{width: '18rem'}} onClick={handleShowAvatar} className="profile-buttons">Add avatar</Button>}

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
                    <Button variant="primary" onClick={handleEditBio}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAvatarModal} onHide={handleCloseAvatar} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enter URL for avatar image (Some URL's may not render the image due to Cross Origin Read Blocking)</Modal.Title>
                </Modal.Header>
                <Modal.Body as="textarea" value={avatarModalValue} onChange={(e) => setAvatarModalValue(e.target.value)}></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAvatar}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditAvatar}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ProfilePage

