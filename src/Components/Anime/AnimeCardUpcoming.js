import React from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

function AnimeCardUpcoming({title, image, id}) {
    return (
        <Col className="mt-3" >
            <Link to={`/anime/${id}`}>
                <Card className="bg-white text-white"  key={id}>
                        <Card.Img src={image} alt="Card image" />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title className="anime-card-title">{title}</Card.Title>
                        </Card.ImgOverlay>
                </Card>
            </Link>
        </Col>
    )
}

export default AnimeCardUpcoming
