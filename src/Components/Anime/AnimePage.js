import React from 'react'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'

function AnimePage() {
    const params = useParams()
    const [anime, setAnime] = useState()


    useEffect(() => {
        fetch(`https://api.jikan.moe/v3/anime/${params.id}`)
        .then(r => r.json())
        .then(animeFetched => {
            setAnime(animeFetched)
        })
    }, [])

    console.log("Anime in state:", anime)

    return (
        <div>
            
        </div>
    )
}

export default AnimePage
