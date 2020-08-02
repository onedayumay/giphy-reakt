import {useState, useEffect} from 'react'
import Config from './Config'

function useGiphy(query: string){

  const _conf = new Config().config
  const APIKey: string = `${_conf.api.key}`
  const APILimit: string = `${_conf.api.limit}`
  const ApiURL: string = `${_conf.api.url}${APIKey}&limit=${APILimit}&offset=0&rating=g`
  const [results, setResults] = useState([])

  useEffect(() => {

    async function FetchImages(){
      try{
        const response = await fetch(`${ApiURL}&q=${query}`)
        const json = await response.json()
        
        return json.data.map((item:any) =>{
          return item.images.fixed_width_still.url
        })
      } catch (error){
        console.error(error)
      }
    }

    if(query !== ''){
      FetchImages().then(setResults)
    }

  }, [query])

  return results

}

export default useGiphy