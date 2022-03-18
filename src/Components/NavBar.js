import React, {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {useHistory} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { RiDiscussFill, RiHome2Fill, RiUser3Fill, RiFileMarkFill} from "react-icons/ri";
import { FcImport } from "react-icons/fc";
import axios from 'axios'

function NavBar({userIsLoggedIn, setUserIsLoggedIn}) {
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()


    const logoutUser = async () => {       
        try{
            await axios.delete('https://anime-axis-api.herokuapp.com/logout', { withCredentials: true })
            setShowModal(false)
            setUserIsLoggedIn(false)
            history.push("/")
        }catch(error) {
            console.log(error.message)
        }
    }


    const handleCloseModal = () => setShowModal(false)
    
    const handleShowModal = () => {
        setShowModal(true)
    }


    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/" id="anime-axis-nav-header">Anime Axis</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavDropdown title={<RiHome2Fill/>}  menuVariant="dark">
                            <NavDropdown.Item href="/">Anime home</NavDropdown.Item>
                            <NavDropdown.Item href="/manga">Manga home</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={<RiDiscussFill />}  menuVariant="dark">
                            <NavDropdown.Item href="/forums/anime">Anime forum</NavDropdown.Item>
                            <NavDropdown.Item href="/forums/manga">Manga forum</NavDropdown.Item>
                            <NavDropdown.Item href="/forums/general">General forum</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={<RiFileMarkFill/>} menuVariant="dark" >
                            <NavDropdown.Item href="/animelist">Anime list</NavDropdown.Item>
                            <NavDropdown.Item href="/mangalist">Manga list</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/profile"><RiUser3Fill /></Nav.Link>
                        {userIsLoggedIn ? <Nav.Link href="" id="logout-button" onClick={handleShowModal}><FcImport/></Nav.Link> : null}
                    </Nav>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={handleCloseModal} animation={false} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to logout?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        No
                    </Button>
                    <Button variant="success" onClick={logoutUser}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NavBar
