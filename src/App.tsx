import React, {useState, useRef, useCallback} from 'react'
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
    hasMore,
    loading,
    error
  } = useGiphy(query, page, newSearch)

  //console.info(`query->'${query}', more results ${hasMore}`)

  /*
  const observer = useRef()
  const lastSearchRef = useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        console.log('intersecting')
      }
    })
  })  
  */

  function onClick(e:any){
    if(e.target.value !== ''){
      setSearch('')
    }
  }

  function onChange(e: any){
    if(e.target.value !== ''){
      setPage(0)
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
      setQuery(search)
      changePageTitle(`Giphy results for "${search}"`)
    }
  }

  function infiniteScrollLoadNextPage(){
    setNewSearch(false)
    setPage( page + 1 )
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
              onClick={onClick}
              placeholder="Buscar gifhys"
            />
            <button type="submit">Search</button>
          </form>
          <div className="results">
              {results.map(item => (
                <img key={item} alt={search} src={item}></img>
              ))}
          </div>

          <div>{loading && query !== '' && `Loading...`}</div>
          <div>{error && `Error! Try again.`}</div>

          {
          query !== '' && hasMore &&
            <button onClick={infiniteScrollLoadNextPage}>next page</button>
          }
        </div>
      </header>
    </div>
  )
}

export default App
