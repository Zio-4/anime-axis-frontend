import React from 'react'
import Card from 'react-bootstrap/Card'

function Comment({content, userID}) {
    return (
        <Card style={{ width: '75rem' }} >
            <Card.Header>By Username</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {content}
                    </Card.Text>
                </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    )
}

export default Comment
