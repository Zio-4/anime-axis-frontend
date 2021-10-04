import {useEffect} from 'react'

function Homepage() {

    useEffect(() => {
        fetch("https://api.jikan.moe/v3/manga/1")
        .then(r => r.json())
        .then(data => console.log(data))
    })

    return (
        <div>
            
        </div>
    )
}

export default Homepage
