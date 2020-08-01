import {useState, useEffect} from 'react'

function useGiphy(query: String){

  const APIKey: String = "8NotAnqZix8DEeXvlRrUcsuj5LyrP5xw"
  const APILimit: String = "20"
  const ApiURL: String = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=${APILimit}&offset=0&rating=g`
  const [results, setResults] = useState([])

  useEffect(() => {

    async function FetchImages(){
      try{
        const response = await fetch(`${ApiURL}&q=${query}`)
        const json = await response.json()
        
        return json.data.map((item:any) =>{
          return item.images.preview_gif.url
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