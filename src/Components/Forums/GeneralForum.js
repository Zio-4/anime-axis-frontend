import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {useHistory, Link} from 'react-router-dom'
import Loading from '../Loading'
import {useGetData} from '../../Hooks/useGetData'


function GeneralForum({user}) {
    const history = useHistory()

    const { data: generalPosts, isLoading } = useGetData('/forum_posts/general')

    if (isLoading) return <Loading />

    function handleClick() {
        if (user) {
            history.push("/forums/newpost", {from: "general forum"})
        } else {
            // Passing current page as props for rendering error on login page
            // Adding state of the current page
            history.push("/login", {from: "general forum"})
        }
    }

    const renderGeneralPosts = generalPosts.data.map(g => (
            <tr key={g.id}>
                <td>
                <Link to={`/forums/post/${g.id}`}>{g.title}</Link>
                    <br/>
                    {g.user.username} - {g.post_time}
                </td>
                <td>{g.number_of_comments}</td>
            </tr>
        )   
    )

    return (
        <Container className="general-forum-container">
            <h1>General Forum Board</h1>
            <Button onClick={handleClick} className="create-forum-post-button">Create New Post</Button>
            
            <Table striped bordered hover className="general-forum-table">
                <thead>
                    <tr>
                    <th>Post</th>
                    <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                {renderGeneralPosts}
                </tbody>
            </Table>
        </Container>
    )
}

export default GeneralForum
