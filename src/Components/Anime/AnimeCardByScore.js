import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import React from 'react'

function AnimeCardByScore({title, id, image}) {
    return (
        <Col>
                <Link to={`/anime/${id}`}>
                        <Card className="bg-white text-white"  key={id}>
                                <Card.Img src={image} alt="Card image" />
                                <Card.ImgOverlay className="d-flex flex-column justify-content-end" id="card-test">
                                        <Card.Title className="anime-card-title">{title}</Card.Title>
                                </Card.ImgOverlay>
                                {/* <Card.body>
                                        <Card.Text>Test</Card.Text>
                                </Card.body> */}
                        </Card>
                </Link>
        </Col>
    )
}

export default AnimeCardByScore
