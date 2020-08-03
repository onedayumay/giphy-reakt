import {useState, useEffect} from 'react'
import Config from './Config'

function useGiphy(query: string, page: number, newSearch: boolean){

  const _conf = new Config().config
  const APIKey: string = `${_conf.api.key}`
  const APILimit: number = _conf.api.limit
  const offset: number = APILimit * page
  const ApiURL: string = `${_conf.api.url}${APIKey}&limit=${APILimit}&offset=${offset}&rating=g`

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [results, setResults] = useState([])

  useEffect(() => {

    async function FetchImages(){
      try{
        setLoading(true)
        const response = await fetch(`${ApiURL}&q=${query}`)
        const json = await response.json()
        setLoading(false)
        setHasMore(json.pagination.total_count > json.pagination.offset + json.pagination.count)

        return json.data.map((item:any) =>{
          return item.images.original.url
        })
      } catch (error){
        setError(true)
        setLoading(false)
      }
    }

    if(query !== ''){
      console.log("is new search?", newSearch)
      FetchImages().then(newResults =>{
        setResults(newSearch ? newResults : results.concat(newResults))
      })
    }

  }, [ApiURL, query, page])

  return {
    "results":results,
    "hasMore":hasMore,
    "loading":loading,
    "error":error
  }

}

export default useGiphy