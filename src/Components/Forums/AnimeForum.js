import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {useHistory, Link} from 'react-router-dom'
import {useGetData} from '../../Hooks/useGetData'

function AnimeForum({user}) {
    const [animePosts, setAnimePosts] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        fetch("/forum_posts/anime")
        .then(r => r.json())
        .then(animes => {
            setAnimePosts(animes)
        })
    }, [])


    const { data, isLoading, isError} = useGetData('/user')
    console.log("useAxiosGet Data:", data)





    function handleClick() {
        if (user) {
            history.push("/forums/newpost")
        } else {
            // Passing current page as props for rendering error on login page
            // Adding state of the current page
            history.push("/login", {from: "anime forum"})
        }
    }
    
    const renderAnimePosts = animePosts.map(a => (
            
                <tr key={a.id}>
                    <td>
                    <Link to={`/forums/post/${a.id}`}>{a.title}</Link>
                        <br/>
                        {a.user.username} - {a.post_time}
                    </td>
                    <td>{a.number_of_comments}</td>
                </tr>
            
        )
    )

    return (
        <Container className="anime-forum-container">
            <h1>Anime Forum Board</h1>
           <Button onClick={handleClick} className="create-forum-post-button">Create New Post</Button>
            
            <Table striped bordered hover className="anime-forum-table">
                <thead>
                    <tr>
                    <th>Post</th>
                    <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                {renderAnimePosts}
                </tbody>
            </Table>
        </Container>
    )
} 

export default AnimeForum
