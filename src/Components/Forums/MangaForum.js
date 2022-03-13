import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {useHistory, Link} from 'react-router-dom'
import Loading from '../Loading'
import {useGetData} from '../../Hooks/useGetData'

function MangaForum({user}) {
    const history = useHistory()

    const { data: mangaPosts, isLoading } = useGetData('https://anime-axis-api.herokuapp.com/forum_posts/general')

    if (isLoading) return <Loading />

    function handleClick() {
        if (user) {
            history.push("/forums/newpost", {from: "manga forum"})
        } else {
            // Passing current page as props for rendering error on login page
            // Adding state of the current page
            history.push("/login", {from: "manga forum"})
        }
    }

    const renderMangaPosts = mangaPosts.data.map(m => (
            <tr key={m.id}>
                <td>
                <Link to={`/forums/post/${m.id}`}>{m.title}</Link>
                    <br/>
                    {m.user.username} - {m.post_time}
                </td>
                <td>{m.number_of_comments}</td>
            </tr>
        )   
    )

    return (
        <Container className="manga-forum-container">
            <h1>Manga Forum Board</h1>
            <Button onClick={handleClick} className="create-forum-post-button">Create New Post</Button>
            
            <Table striped bordered hover className="manga-forum-table">
                <thead>
                    <tr>
                    <th>Post</th>
                    <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                {renderMangaPosts}
                </tbody>
            </Table>
        </Container>
    )
}

export default MangaForum
