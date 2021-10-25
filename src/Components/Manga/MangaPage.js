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


function MangaPage({user}) {
    const params = useParams()
    const [manga, setManga] = useState()

    useEffect(() => {
        fetch(`https://api.jikan.moe/v3/manga/${params.id}`)
        .then(r => r.json())
        .then(mangaFetched => {
            setManga(mangaFetched)
        })
    }, [params.id])

    function handleClick() {
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

    if (!manga) return <Loading />

    console.log("Manga in state:", manga)

    return (
        <Container className="manga-page-container">
            <Row>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={manga.image_url} />
                        <Card.Body>
                            <Card.Title>{manga.title_english ? manga.title_english : manga.title}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Rank:  {manga.rank}</ListGroup.Item>
                            <ListGroup.Item>Chapters:  {manga.chapters ? manga.chapters : "Unknown"}</ListGroup.Item>
                            <ListGroup.Item>Volumes:  {manga.volumes}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Button onCLick={handleClick}>+ Manga List</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                   <Card>
                   <Card.Body>
                        <Card.Title>Synopsis</Card.Title>
                        <Card.Text>
                             {manga.synopsis}
                        </Card.Text>
                    </Card.Body>
                   </Card>

                    {manga.genres.map(g => <Badge pill bg="dark">{g.name}</Badge>)}

                    <Card id="manga-background-card"> 
                        <Card.Body>
                            <Card.Title>Background</Card.Title>
                            <Card.Text>
                                {manga.background}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Manga Info</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Published: {manga.published.string}</ListGroup.Item>
                            <ListGroup.Item>Type:  {manga.type}</ListGroup.Item>
                            <ListGroup.Item>Authors:  {manga.authors.map(auth => <li>{auth.name}</li>)}</ListGroup.Item>
                            <ListGroup.Item>Rank by popularity:  {manga.popularity}</ListGroup.Item>
                            <ListGroup.Item>Serializations:  {manga.serializations.map(s => <li>{s.name}</li>)}</ListGroup.Item>
                            <ListGroup.Item>MyAnimeList Score:  {manga.score}</ListGroup.Item>
                            <ListGroup.Item>Status:  {manga.status}</ListGroup.Item>
                            <ListGroup.Item>Japanese Title:  {manga.title_japanese}</ListGroup.Item>
                            <ListGroup.Item>Synonyms:  {manga.title_synonyms.map(syn => <li>{syn}</li>)}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default MangaPage
