import { useQuery } from 'react-query'
import axios from 'axios'

const getData = async (url) => {
  try{
    if (url.includes('anime-axis')) {
      return await axios(url, { withCredentials: true, 'Access-Control-Allow-Origin': 'https://anime-axis.herokuapp.com' })
    } else {
      return await axios(url)
    }
  } catch(error){
    console.log(error.message)
  } 
}

export const useGetData = (url, onSuccess) => {
  // Adding on url to the  queryKey so that the hook can be called multiple times in a component. This way it caches the data to the right query.
  return useQuery('getData' + url, () => getData(url), {onSuccess})
}
