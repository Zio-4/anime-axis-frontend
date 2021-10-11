import React from 'react'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Image from 'react-bootstrap/Image'
import Loading from '../Loading'

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

    if (!anime) return <Loading />
    console.log("Anime in state:", anime)

    return (
        <div>
            <Image src={anime.image_url} thumbnail/>
        </div>
    )
}

export default AnimePage
