import {useState, useEffect} from 'react'
import Config from './Config'

function useGiphy(query: String){

  const _conf = new Config().config
  const APIKey: String = `${_conf.api.key}`
  const APILimit: String = `${_conf.api.limit}`
  const ApiURL: String = `${_conf.api.url}${APIKey}&limit=${APILimit}&offset=0&rating=g`
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