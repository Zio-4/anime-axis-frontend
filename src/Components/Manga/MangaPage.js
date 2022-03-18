import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../Loading'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Alert from 'react-bootstrap/Alert'
import { useGetData } from '../../Hooks/useGetData'
import axios from 'axios'


function MangaPage({user}) {
    const params = useParams()
    const [loginAlertState, setLoginAlertState] = useState(false)
    const [addedAlertState, setAddedAlertState] = useState(false)
    const [listButton, setListButton] = useState(false)


    const onSuccess = (manga) => {
        if (user && manga) {
            if (user.data.mangas.find(m => m.title === manga.data.title)){
                setListButton(true)
                }
            } 
    }

    const {data: manga, isLoading} = useGetData(`https://api.jikan.moe/v3/manga/${params.id}`, onSuccess)

    if (isLoading) return <Loading />    


    async function handleClick() {
        if (!user) {
            setLoginAlertState(true)
        } else {
            try {
                let resp = await axios.post('https://anime-axis-api.herokuapp.com/api/mangas', {title: manga.data.title, id: manga.data.mal_id, image_url: manga.data.image_url , score: manga.data.score, user_id: user.id}, { withCredentials: true, 'Access-Control-Allow-Origin': '*' })
                if (resp.data) {
                    setListButton(true)
                    setAddedAlertState(true) 
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <Container className="manga-page-container">
                <Row>
                    <Col med={4} className="d-flex justify-content-center mb-2 h-100">
                        <Card style={{ width: '18rem'}} className="bg-dark text-white ">
                            <Card.Img variant="top" src={manga.data.image_url} />
                            <Card.Body>
                                <Card.Title>{manga.data.title_english ? manga.data.title_english : manga.data.title}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item variant="dark">Rank:  {manga.data.rank}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Chapters:  {manga.data.chapters ? manga.data.chapters : "Unknown"}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Volumes:  {manga.data.volumes}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                            {listButton ? <Button variant="success">Manga in list <span role="img" aria-label="checkmark emoji">✔️</span></Button> : <Button onClick={handleClick} className="add-to-manga-list-button">+ Manga List</Button>}
                            </Card.Body>
                            {loginAlertState ? <Alert variant="danger" className="manga-page-alert" onClose={() => setLoginAlertState(false)} dismissible>You must be logged in to add a manga!</Alert> : null}
                            {addedAlertState ? <Alert variant="success" onClose={() => setAddedAlertState(false)} dismissible>Manga has been added to your list</Alert> : null}
                        </Card>
                    </Col>
                

                
                    <Col med={4}>
                        <Card className="bg-dark text-white">
                            <Card.Body>
                                <Card.Title>Synopsis</Card.Title>
                                <Card.Text>
                                    {manga.data.synopsis}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        {manga.data.genres.map(g => <Badge key={g.name} pill bg="light" text="dark">{g.name}</Badge>)}

                        <Card id="manga-background-card" className="bg-dark text-white mb-2"> 
                            <Card.Body>
                                <Card.Title>Background</Card.Title>
                                <Card.Text>
                                    {manga.data.background}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col med={4} className="d-flex justify-content-center mb-2 h-100">
                        <Card style={{ width: '18rem' }} className="bg-dark text-white ">
                            <Card.Header>Manga Info</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item variant="dark">Published: {manga.data.published.string}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Type:  {manga.data.type}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Authors:  {manga.data.authors.map(author => <li key={author.name}>{author.name}</li>)}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Rank by popularity:  {manga.data.popularity}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Serializations:  {manga.data.serializations.map(s => <li key={s.name}>{s.name}</li>)}</ListGroup.Item>
                                <ListGroup.Item variant="dark">MyAnimeList Score:  {manga.data.score}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Status:  {manga.data.status}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Japanese Title:  {manga.data.title_japanese}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Synonyms:  {manga.data.title_synonyms.map(syn => <li key={syn}>{syn}</li>)}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MangaPage
