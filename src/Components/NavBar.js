import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

function NavBar({user, onLogout}) {

    function logoutUser() {
        fetch("logout", {
            method: "DELETE"
        })
        onLogout()
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/" id="anime-axis-nav-header">Anime Axis</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Forums</Nav.Link>
                        <Nav.Link href="#features">Manga</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        {user ?  <Nav.Link href="/profile">Profile</Nav.Link> : <Nav.Link href="/signup">Create Account</Nav.Link>}
                        {user ? <Nav.Link href="" id="logout-button" onClick={logoutUser}>Logout</Nav.Link> : <Nav.Link href="/login">Sign in</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar

{/* <Nav.Link href="" id="logout-button">Logout</Nav.Link> */}