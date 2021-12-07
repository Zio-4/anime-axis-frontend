import {useQuery} from 'react-query'
import axios from 'axios'

const getData = async (url) => {
  try{
    return await axios(url)
  }catch(error){
    console.log(error.message)
  } 
}
export const useGetData = (url, onSuccess) => {
  return useQuery('getData', () => getData(url), {onSuccess})
}

// testing in AnimeForum component