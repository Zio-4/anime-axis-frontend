import React, {useState} from 'react'
// import Navbar from 'react-bootstrap/Navbar'
// import Container from 'react-bootstrap/Container'
// import Nav from 'react-bootstrap/Nav'
import {Link, useHistory} from 'react-router-dom'

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { RiMenuLine, RiDiscussFill, RiHome2Fill, RiUser3Fill, RiFileMarkFill} from "react-icons/ri";
import { FcImport } from "react-icons/fc";

function NavBar({user, onLogout}) {
    const [collapseState, setCollapseState] = useState(true)
    const history = useHistory()

    function handleCollapseState() {
        setCollapseState(!collapseState)
    }

    function logoutUser() {
        fetch("/logout", {
            method: "DELETE"
        })
        onLogout()
        history.push("/")
    }
    console.log("user in navbar:", user)

    return (
        <>
            {/* <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/" id="anime-axis-nav-header">Anime Axis</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/forums">Forums</Nav.Link>
                        <Nav.Link href="/manga">Manga</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        {user ?  <Nav.Link href="/profile">Profile</Nav.Link> : <Nav.Link href="/signup">Create Account</Nav.Link>}
                        {user ? <Nav.Link href="" id="logout-button" onClick={logoutUser}>Logout</Nav.Link> : <Nav.Link href="/login">Sign in</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar> */}
            <ProSidebar collapsed={collapseState} width="190px" collapsedWidth="70px" className="sidebar">
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
            </ProSidebar>
        </>
    )
}

export default NavBar
