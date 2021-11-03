import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function AnimeCardAiring({title, id, image}) {
    return (
        <OverlayTrigger placement="top" overlay={
            <Tooltip>{title}</Tooltip>
    }>
            <Col className="mt-3">
            <Card className="bg-dark text-white fluid"  key={id}>
                    <Link to={`/anime/${id}`}><Card.Img className="mainpage-cards" src={image} alt="Card image" /></Link>
            </Card>  
            </Col>
            
    </OverlayTrigger>
    )
}

export default AnimeCardAiring
