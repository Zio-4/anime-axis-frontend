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

    if (!anime) return <Loading />

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

    console.log("anime in anime page", anime)

   
    


    return (
        <div>
        <Container className="anime-page-container" >
            <Row>
                <Col>
                    <Card style={{ width: '18rem' }} >
                        <Card.Img variant="top" src={anime.image_url} />
                        <Card.Body>
                            <Card.Title>{anime.title_english ? anime.title_english : anime.title}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Rank: {anime.rank}</ListGroup.Item>
                            <ListGroup.Item>Episodes: {anime.episodes ? anime.episodes : "Unknown"}</ListGroup.Item>
                            <ListGroup.Item>Duration: {anime.duration}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Button onClick={handleClick}>+ Anime List</Button>
                        </Card.Body>
                    </Card>
                    {alertState ? <Alert variant="danger" className="anime-page-alert" onClose={() => setAlertState(false)} dismissible>You must be logged in to add an anime!</Alert> : null}
                </Col>
                <Col>
                   <Card>
                   <Card.Body>
                        <Card.Title>Synopsis</Card.Title>
                        <Card.Text>
                            {anime.synopsis}
                        </Card.Text>
                    </Card.Body>
                   </Card>
                   {anime.genres.map(g => <Badge key={g.name} pill bg="dark">{g.name}</Badge>)}
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Anime Info</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Aired: {anime.aired.string}</ListGroup.Item>
                            <ListGroup.Item>Type: {anime.type}</ListGroup.Item>
                            <ListGroup.Item>Rank by popularity: {anime.popularity}</ListGroup.Item>
                            <ListGroup.Item>Producers: {anime.producers.map(prod => <li key={prod.name}>{prod.name}</li>) }</ListGroup.Item>
                            <ListGroup.Item>Premiered: {anime.premiered}</ListGroup.Item>
                            <ListGroup.Item>Rating: {anime.rating}</ListGroup.Item>
                            <ListGroup.Item>MyAnimeList Score: {anime.score}</ListGroup.Item>
                            <ListGroup.Item>Status: {anime.status}</ListGroup.Item>
                            <ListGroup.Item>Studios: {anime.studios.map(studio => <li key={studio.name}>{studio.name}</li>)}</ListGroup.Item>
                            <ListGroup.Item>Japanese Title: {anime.title_japanese}</ListGroup.Item>
                            <ListGroup.Item>Synonyms: {anime.title_synonyms.map(syn => <li key={syn}>{syn}</li>)}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>

        <Container>
            <Row className="d-flex justify-content-center mt-3">
                
            </Row>
        </Container>
        </div>

    )
}

export default AnimePage
