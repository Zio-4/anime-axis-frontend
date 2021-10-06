import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

function NavBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/" id="anime-axis-nav-header">Anime Axis</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Forums</Nav.Link>
                        <Nav.Link href="#features">Manga</Nav.Link>
                        <Nav.Link href="#pricing">About</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar
