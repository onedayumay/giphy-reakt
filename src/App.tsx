import React, {useState} from 'react'
import './App.css'
import useGiphy from './Giphy'
import Config from './Config'
import InfiniteScroll from "react-infinite-scroll-component"

function App() {

  const _conf = new Config().config
  const [pageTitle, setPageTitle] = useState(`${_conf.page.title}`)
  const [search, setSearch] = useState(`${_conf.page.placeholder}`)
  const [query, setQuery] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const results = useGiphy(query, page, hasMore)

  function onClick(e:any){
    setSearch('')
  }

  function onChange(e: any){
    setHasMore(true)
    setPage(0)
    setSearch(e.target.value)
  }

  function changePageTitle(title: string){
    setPageTitle(title)
    document.title = title
  }

  function onSubmit(e: any){
    e.preventDefault()
    setQuery(search)
    changePageTitle(`Giphy results for "${search}"`)
  }

  function iNextScroll(){
    setPage( page + 1 )
    setHasMore(true)
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
            <InfiniteScroll
            next={iNextScroll}
            hasMore={hasMore}
            dataLength={1}
            loader={<h4>Loading...</h4>}
            endMessage={`No more results`}>
              {results.map(item => (
                <img key={item} alt={search} src={item}></img>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
