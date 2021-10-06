import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function AnimeCard({title, id, image, rank}) {
    return (
        <Col className="mt-3" >
            <Card className="bg-white text-white"  key={id}>
                    <Card.Img src={image} alt="Card image" />
                        <Card.ImgOverlay>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>Rank: {rank}</Card.Text>
                    </Card.ImgOverlay>
            </Card>
        </Col>
    )
}

export default AnimeCard
