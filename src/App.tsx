import React, {useState, useRef} from 'react'
import './App.css'
import useGiphy from './Giphy'
import Config from './Config'
import HookScreen from './hooks/hookScreen'

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

  const ref = useRef()
  const endPage = HookScreen(ref, '400px')

  if(endPage && !loading && query !== '' && !noMore){
    setTimeout(() =>{
      infiniteScrollLoadNextPage()
    }, 1000)
    
  }

  function onClick(e:any){
    if(e.target.value !== ''){
      setSearch('')
    }
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

  function infiniteScrollLoadNextPage(){
    setNewSearch(false)
    setPage( page + 1 )
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

          <div>{loading && query !== '' && `Loading...`}</div>
          <div>{error && `Error! Try again.`}</div>
          <div>{noMore && `End of the road, search another thing!`}</div>

        </div>
      </div>
      <div className="endPage" ref={ref}></div>
    </div>
  )
}

export default App
