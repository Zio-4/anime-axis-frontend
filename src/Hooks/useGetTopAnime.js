import React from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'

const getTopAnimeByScore = async () => {
    return await axios("https://api.jikan.moe/v3/top/anime/1/tv")
}

const getTopAnimeByAiring = async () => {
    return await axios("https://api.jikan.moe/v3/top/anime/1/airing")
}

const getTopAnimeByPopularity = async () => {
    return await axios("https://api.jikan.moe/v3/top/anime/1/bypopularity")
}

const getTopAnimeByUpcoming = async () => {
    return await axios("https://api.jikan.moe/v3/top/anime/1/upcoming")
}

export const useGetTopAnime = () => {
    const {data: animeScore} = useQuery('topAnimeByScore', getTopAnimeByScore)
    const {data: animeAiring} = useQuery('topAnimeByAiring', getTopAnimeByAiring)
    const {data: animePopularity} = useQuery('topAnimeByPopularity', getTopAnimeByPopularity)
    const {data: animeUpcoming} = useQuery('topAnimeByUpcoming', getTopAnimeByUpcoming)
}