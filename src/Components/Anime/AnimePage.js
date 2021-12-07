import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import Loading from '../Loading'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Alert from 'react-bootstrap/Alert'
import {useGetData} from '../../Hooks/useGetData'
import axios from 'axios'


function AnimePage({user}) {
    const params = useParams()
    const [loginAlertState, setLoginAlertState] = useState(false)
    const [addedAlertState, setAddedAlertState] = useState(false)
    const [listButton, setListButton] = useState(false)
    
    const onSuccess = (anime) => {
        if (user && anime) {
            if (user.data.animes.find(a => a.title === anime.data.title)){
                setListButton(true)
                }
            } 
    }

    const {data: anime, isLoading} = useGetData(`https://api.jikan.moe/v3/anime/${params.id}`, onSuccess)

    if (isLoading) return <Loading />


   async function handleClick() {
        if (!user) {
            setLoginAlertState(true)
        } else {
            try {
                let resp = await axios.post('/animes', {title: anime.data.title, id: anime.data.mal_id, image_url: anime.data.image_url , score: anime.data.score, user_id: user.id})
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
        <Container className="anime-page-container" >
            <Row >
                <Col className=" anime-cards d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} className="bg-dark text-white">
                        <Card.Img variant="top" src={anime.data.image_url} />
                        <Card.Body>
                            <Card.Title>{anime.data.title_english ? anime.data.title_english : anime.data.title}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item variant="dark">Rank: {anime.data.rank}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Episodes: {anime.data.episodes ? anime.data.episodes : "Unknown"}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Duration: {anime.data.duration}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            {listButton ? <Button variant="success">Anime in list <span role="img" aria-label="checkmark emoji">✔️</span></Button> : <Button onClick={handleClick} className="add-to-anime-list-button">+ Anime List</Button>}
                        </Card.Body>
                        {loginAlertState ? <Alert variant="danger" className="anime-page-alert" onClose={() => setLoginAlertState(false)} dismissible>You must be logged in to add an anime!</Alert> : null}
                        {addedAlertState ? <Alert variant="success" onClose={() => setAddedAlertState(false)} dismissible>Anime has been added to your list</Alert> : null}
                    </Card>
                    
                </Col>
                <Col className="anime-cards">
                   <Card className="bg-dark text-white">
                   <Card.Body>
                        <Card.Title>Synopsis</Card.Title>
                        <Card.Text>
                            {anime.data.synopsis}
                        </Card.Text>
                    </Card.Body>
                   </Card>
                   {anime.data.genres.map(g => <Badge key={g.name} pill bg="light" text="dark">{g.name}</Badge>)}
                </Col>
                <Col className="anime-cards d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} className="bg-dark text-white">
                        <Card.Header>Anime Info</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item variant="dark">Aired: {anime.data.aired.string}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Type: {anime.data.type}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Rank by popularity: {anime.data.popularity}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Producers: {anime.data.producers.map(prod => <li key={prod.name}>{prod.name}</li>) }</ListGroup.Item>
                            <ListGroup.Item variant="dark">Premiered: {anime.data.premiered}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Rating: {anime.data.rating}</ListGroup.Item>
                            <ListGroup.Item variant="dark">MyAnimeList Score: {anime.data.score}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Status: {anime.data.status}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Studios: {anime.data.studios.map(studio => <li key={studio.name}>{studio.name}</li>)}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Japanese Title: {anime.data.title_japanese}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Synonyms: {anime.data.title_synonyms.map(syn => <li key={syn}>{syn}</li>)}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default AnimePage
