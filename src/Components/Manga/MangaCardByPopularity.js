import React from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function MangaCardByPopularity({title, image, id}) {
    return (
        <OverlayTrigger placement="top" overlay={
            <Tooltip>{title}</Tooltip>
    }>
        <Col className="mt-3">
            <Card className="bg-dark text-white"  key={id}>
                <Link to={`/manga/${id}`}><Card.Img className="mainpage-cards" src={image} alt="Card image" /></Link>
            </Card>  
        </Col>
        </OverlayTrigger>
    )
}

export default MangaCardByPopularity
