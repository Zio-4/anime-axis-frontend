import React from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

function MangaCardByPopularity({title, image, id}) {
    return (
        <Col className="mt-3">
            <Card className="bg-dark text-white"  key={id}>
                <Link to={`/manga/${id}`}><Card.Img className="mainpage-cards" src={image} alt="Card image" /></Link>
                    <Card.Body>
                        <Card.Text>
                            {title}
                        </Card.Text>
                    </Card.Body>
            </Card>  
        </Col>
    )
}

export default MangaCardByPopularity
