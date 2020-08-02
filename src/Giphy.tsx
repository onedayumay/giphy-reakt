import {useState, useEffect} from 'react'
import Config from './Config'

function useGiphy(query: string, page: number, hasMore: boolean){

  const _conf = new Config().config
  const APIKey: string = `${_conf.api.key}`
  const APILimit: number = _conf.api.limit
  const offset: number = APILimit * page
  const ApiURL: string = `${_conf.api.url}${APIKey}&limit=${APILimit}&offset=${offset}&rating=g`
  const [results, setResults] = useState([])

  useEffect(() => {

    async function FetchImages(){
      console.log("page", page)
      console.log("hasMore", hasMore)
      try{
        const response = await fetch(`${ApiURL}&q=${query}`)
        const json = await response.json()
        
        return json.data.map((item:any) =>{
          return item.images.original.url
        })
      } catch (error){
        console.error(error)
      }
    }

    if(query !== ''){
      FetchImages().then(setResults)
    }

  }, [ApiURL, query, page, hasMore])

  return results

}

export default useGiphy