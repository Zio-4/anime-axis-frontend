import React from 'react'
import Card from 'react-bootstrap/Card'

function Comment({content, userID, time, username}) {
    return (
        <Card className="mt-2">
            <Card.Header>By {username}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {content}
                    </Card.Text>
                </Card.Body>
            <Card.Footer className="text-muted">{time}</Card.Footer>
        </Card>
    )
}

export default Comment
