import React, {useState} from 'react'
import './App.css'
import useGiphy from './Giphy'
import Config from './Config'

function App() {

  const _conf = new Config().config
  const [pageTitle, setPageTitle] = useState(`${_conf.page.title}`)
  const [search, setSearch] = useState(`${_conf.page.placeholder}`)
  const [newSearch, setNewSearch] = useState(true)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)

  const {
    results,
    noMore,
    loading,
    error
  } = useGiphy(query, page, newSearch)

  function onClick(e:any){
    setSearch('')
  }

  function onChange(e: any){
    if(e.target.value !== ''){
      setSearch(e.target.value)
    }
  }

  function changePageTitle(title: string){
    setPageTitle(title)
    document.title = title
  }

  function onSubmit(e: any){
    e.preventDefault()
    if(search !== ''){
      setNewSearch(true)
      setPage(0)
      setQuery(search)
      changePageTitle(`Giphy results for "${search}"`)
    }
  }

  function loadMoreResults(){
    setNewSearch(false)
    setPage( page + 1 )
  }

  let pagination
  if(query === ''){
    pagination = <div>{`Search something and party!`}</div>
  }else if(noMore){
    pagination = <div>{`End of the road, search another thing!`}</div>
  }else{
    pagination = 
      <div>
        <button 
          className="moreResults" 
          onClick={loadMoreResults}>
          {`¡Load more results!`}
        </button>
      </div>
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>{pageTitle}</h1>
          <form onSubmit={onSubmit}>
            <input
              value={search}
              onChange={onChange}
              onClick={onClick}
              placeholder="Buscar gifhys"
            />
            <button type="submit">Search</button>
          </form>
        </header>
        <div>
          <div className="results">
              {results.map(item => (
                <img key={item} alt={search} src={item}></img>
              ))}
          </div>

          <div>{error && `Error! Try again.`}</div>
          
          <div>{loading && query !== '' && `Loading...`}</div>

          {pagination}

        </div>
      </div>
    </div>
  )
}

export default App
