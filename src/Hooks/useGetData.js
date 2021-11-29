import {useQuery} from 'react-query'
import axios from 'axios'

const getData = async (url) => {
  return await axios(url)
}
export const useGetData = (url) => {
  return useQuery('getData', () => getData(url))
}

// testing in AnimeForum component