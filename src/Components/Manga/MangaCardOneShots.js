import React from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function MangaCardOneShots({title, image, id}) {
    return (
        <OverlayTrigger placement="top" overlay={
            <Tooltip>{title}</Tooltip>
    }>
        <Col xs={6} md={2}>
            <Card className="bg-dark text-white mainpage-cards"  key={id}>
                <Link to={`/manga/${id}`}><Card.Img className="mainpage-cards" src={image} alt="Card image" /></Link>
            </Card>  
        </Col>
        </OverlayTrigger>
    )
}

export default MangaCardOneShots
