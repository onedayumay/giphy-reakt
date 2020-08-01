import React, {useState} from 'react'
import './App.css'
import useGiphy from './Giphy'

function App() {

  const [pageTitle, setPageTitle] = useState(`Giphy Reakt APP`)
  const [search, setSearch] = useState('pizza')
  const [query, setQuery] = useState('')
  const results = useGiphy(query)

  function onChange(e: any){
    setSearch(e.target.value)
  }

  function onSubmit(e: any){
    e.preventDefault()
    setQuery(search)
    setPageTitle(`Giphy results for: ${search}`)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{pageTitle}</h1>
        <div>
          <form onSubmit={onSubmit}>
            <input
              value={search}
              onChange={onChange}
              placeholder="Buscar gifhys"
            />
            <button type="submit">Search</button>
          </form>
          <div className="results">
            {results.map(item => (
              <img key={item} src={item}></img>
            ))}
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
