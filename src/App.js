import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
// const clientID = `?client_id=hpJAThY6cO9-K3-WauG1u6M_SIRSx5H94ZcFF7CPM4k`
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`
console.log(clientID)
function App() {
  const [loading,setLoading] = useState(false)
  const [query,setQuery] = useState('')
  const [page,setPage] = useState(0)
  const [array,setArray] = useState([])
  const fetchData = async()=>{
    setLoading(true)
    let url
    const PageUrl = `&page=${page}`
    const QueryUrl = `&query=${query}`
    if(query){
      url = `${searchUrl}${clientID}${PageUrl}${QueryUrl}` 
    }
    else{
      url = `${mainUrl}${clientID}${PageUrl}` 
    }
    const res = await fetch(url)
    const image = await res.json()
    setArray(array=>{
      if (query && page === 1) {
          return image.results
        }else if(query){
        return [...array,...image.results]
      }
      else{
        return [...array,...image]
      }
    })
    setLoading(false)
  }
  useEffect(()=>{
    fetchData()
  },[page])
    useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if ((!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight   ) {
        // setLoading(true)
        setPage((oldPage) => {
          return oldPage + 1
        })
      }
    })
    return () => window.removeEventListener('scroll', event)
  }, [])
  const handleSubmit = (e)=>{
      e.preventDefault()
      setPage(1)
  }
  return <main >
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <input type="text" className="form-input" placeholder="Search" value={query} style={{'outline':'0'}} onChange={(e)=>setQuery(e.target.value)} />
        <button className="submit-btn" type="submit">
          <FaSearch />
        </button>
      </form>
    </section>
    <section className="photos">
      <div className="photos-center">
        {
         
            array.map((image,i)=>{
              return <Photo key={i} {...image} />
            })
        }
      </div>
      {loading && <h2 className='loading'>Loading...</h2>}
    </section>
  </main>
}

export default App
