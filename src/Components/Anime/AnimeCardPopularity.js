import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import React from 'react'

function AnimeCardPopularity({title, id, image}) {
    return (
        <Col className="mt-3">
            <Card className="bg-dark text-white"  key={id}>
                <Link to={`/anime/${id}`}><Card.Img  className="mainpage-cards" src={image} alt="Card image" /></Link>
                    <Card.Body>
                        <Card.Text>
                            {title}
                        </Card.Text>
                    </Card.Body>
            </Card>  
        </Col>
    )
}

export default AnimeCardPopularity
