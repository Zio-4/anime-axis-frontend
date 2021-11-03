import React, {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {useHistory} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import { RiMenuLine, RiDiscussFill, RiHome2Fill, RiUser3Fill, RiFileMarkFill} from "react-icons/ri";
import { FcImport } from "react-icons/fc";

function NavBar({user, onLogout}) {
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()

    // function handleCollapseState() {
    //     setCollapseState(!collapseState)
    // }

    function logoutUser() {
        fetch("/logout", {
            method: "DELETE"
        })
        onLogout()
        setShowModal(false)
        history.push("/")
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
                        {user ? <Nav.Link href="" id="logout-button" onClick={handleShowModal}><FcImport/></Nav.Link> : null}
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
            {/* <ProSidebar collapsed={collapseState} width="190px" collapsedWidth="70px" className="sidebar">
                <Menu >
                    <MenuItem icon={<RiMenuLine />} onClick={handleCollapseState}></MenuItem>

                    <SubMenu icon={<RiHome2Fill/>} title="Home">
                        <MenuItem>Anime <Link to="/"/></MenuItem>
                        <MenuItem>Manga <Link to="/manga"/></MenuItem>
                    </SubMenu>

                    <SubMenu icon={<RiDiscussFill />} title="Forums" >
                        <MenuItem>Anime Forum <Link to="/forums/anime"/></MenuItem>
                        <MenuItem>Manga Forum <Link to="/forums/manga"/></MenuItem>
                        <MenuItem>General Forum <Link to="/forums/general"/></MenuItem>
                    </SubMenu>

                    <SubMenu icon={<RiFileMarkFill/>} title="My Lists">
                        <MenuItem>Anime List <Link to="/animelist"/></MenuItem>
                        <MenuItem>Manga List <Link to="/mangalist"/></MenuItem>
                    </SubMenu>

                    <MenuItem icon={<RiUser3Fill />}>Profile <Link to="/profile"/></MenuItem>

                    {user ? <MenuItem icon={<FcImport/>} onClick={logoutUser}>Logout</MenuItem> : null}

                </Menu>
            </ProSidebar> */}
        </>
    )
}

export default NavBar
