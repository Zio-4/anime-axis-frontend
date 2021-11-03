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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'


function AnimePage({user}) {
    const params = useParams()
    const [anime, setAnime] = useState()
    const [alertState, setAlertState] = useState(false)

   

    useEffect(() => {
        fetch(`https://api.jikan.moe/v3/anime/${params.id}`)
        .then(r => r.json())
        .then(animeFetched => {
            setAnime(animeFetched)
        })
    }, [params.id])

    
    console.log("user in anime page:", user)

    function handleClick() {
        if (!user) {
            setAlertState(true)
        } else {
            fetch("/animes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title: anime.title, id: anime.mal_id, image_url: anime.image_url , score: anime.score, user_id: user.id})
            })
            .then(r => r.json())
            .then(createdAnimeData => {
                console.log("anime page created anime data", createdAnimeData)
            }) 
        }
    }

    if (!anime) return <Loading />


    return (
        <div>
        <Container className="anime-page-container" >
            <Row >
                <Col className="anime-cards d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} className="bg-dark text-white">
                        <Card.Img variant="top" src={anime.image_url} />
                        <Card.Body>
                            <Card.Title>{anime.title_english ? anime.title_english : anime.title}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item variant="dark">Rank: {anime.rank}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Episodes: {anime.episodes ? anime.episodes : "Unknown"}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Duration: {anime.duration}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Button onClick={handleClick} className="add-to-anime-list-button">+ Anime List</Button>
                        </Card.Body>
                    </Card>
                    {alertState ? <Alert variant="danger" className="anime-page-alert" onClose={() => setAlertState(false)} dismissible>You must be logged in to add an anime!</Alert> : null}
                </Col>
                <Col className="anime-cards">
                   <Card className="bg-dark text-white">
                   <Card.Body>
                        <Card.Title>Synopsis</Card.Title>
                        <Card.Text>
                            {anime.synopsis}
                        </Card.Text>
                    </Card.Body>
                   </Card>
                   {anime.genres.map(g => <Badge key={g.name} pill bg="light" text="dark">{g.name}</Badge>)}
                </Col>
                <Col className="anime-cards d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} className="bg-dark text-white">
                        <Card.Header>Anime Info</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item variant="dark">Aired: {anime.aired.string}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Type: {anime.type}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Rank by popularity: {anime.popularity}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Producers: {anime.producers.map(prod => <li key={prod.name}>{prod.name}</li>) }</ListGroup.Item>
                            <ListGroup.Item variant="dark">Premiered: {anime.premiered}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Rating: {anime.rating}</ListGroup.Item>
                            <ListGroup.Item variant="dark">MyAnimeList Score: {anime.score}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Status: {anime.status}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Studios: {anime.studios.map(studio => <li key={studio.name}>{studio.name}</li>)}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Japanese Title: {anime.title_japanese}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Synonyms: {anime.title_synonyms.map(syn => <li key={syn}>{syn}</li>)}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default AnimePage
