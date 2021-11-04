import React from 'react'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Loading from '../Loading'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Alert from 'react-bootstrap/Alert'


function MangaPage({user}) {
    const params = useParams()
    const [manga, setManga] = useState()
    const [alertState, setAlertState] = useState(false)

    useEffect(() => {
        fetch(`https://api.jikan.moe/v3/manga/${params.id}`)
        .then(r => r.json())
        .then(mangaFetched => {
            setManga(mangaFetched)
        })
    }, [params.id])

    function handleClick() {
        if (!user) {
            setAlertState(true)
        } else {
            fetch("/mangas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title: manga.title, id: manga.mal_id, image_url: manga.image_url , score: manga.score, user_id: user.id})
            })
            .then(r => r.json())
            .then(createdMangaData => {
                console.log("manga page, created manga data", createdMangaData)
            })
        }
    }

    if (!manga) return <Loading />

    return (
        <div>
            <Container className="manga-page-container">
                <Row>
                    <Col className="d-flex justify-content-center mb-2">
                        <Card style={{ width: '18rem'}} className="bg-dark text-white ">
                            <Card.Img variant="top" src={manga.image_url} />
                            <Card.Body>
                                <Card.Title>{manga.title_english ? manga.title_english : manga.title}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item variant="dark">Rank:  {manga.rank}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Chapters:  {manga.chapters ? manga.chapters : "Unknown"}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Volumes:  {manga.volumes}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Button onClick={handleClick} className="add-to-manga-list-button">+ Manga List</Button>
                            </Card.Body>
                        </Card>
                        {alertState ? <Alert variant="danger" className="manga-page-alert" onClose={() => setAlertState(false)} dismissible>You must be logged in to add a manga!</Alert> : null}
                    </Col>
                </Row>

                <Row>
                    <Col>
                    <Card className="bg-dark text-white">
                    <Card.Body>
                            <Card.Title>Synopsis</Card.Title>
                            <Card.Text>
                                {manga.synopsis}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                        {manga.genres.map(g => <Badge key={g.name} pill bg="light" text="dark">{g.name}</Badge>)}

                        <Card id="manga-background-card" className="bg-dark text-white mb-2"> 
                            <Card.Body>
                                <Card.Title>Background</Card.Title>
                                <Card.Text>
                                    {manga.background}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center mb-2">
                        <Card style={{ width: '18rem' }} className="bg-dark text-white ">
                            <Card.Header>Manga Info</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item variant="dark">Published: {manga.published.string}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Type:  {manga.type}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Authors:  {manga.authors.map(auth => <li key={auth.name}>{auth.name}</li>)}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Rank by popularity:  {manga.popularity}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Serializations:  {manga.serializations.map(s => <li key={s.name}>{s.name}</li>)}</ListGroup.Item>
                                <ListGroup.Item variant="dark">MyAnimeList Score:  {manga.score}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Status:  {manga.status}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Japanese Title:  {manga.title_japanese}</ListGroup.Item>
                                <ListGroup.Item variant="dark">Synonyms:  {manga.title_synonyms.map(syn => <li key={syn}>{syn}</li>)}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MangaPage
