import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bars } from 'react-loading-icons'

function App() {
  const [data, setData] = useState(null);
  const [url, setURL] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputValue = (event) => {
    setURL(event.target.value);
  }

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`http://98.83.54.147:8000/reviewsummariser/summary/?url=${url}`)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'something went wrong');
      }
      const result = await response.json();
      setData(result);
      setError('');
    } catch (error) {
      setError(error || 'Unknown error occured');
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <header className="d-flex justify-content-center text-center">
        <h1 className='bold-text'>Amazon review summariser</h1>
      </header>
      <div className="container d-flex justify-content-center align-items-center mt-3">
        <div className="text-center mb-3">
          <h2 className="light-text">Enter an Amazon Product URL to See a Summary of the Reviews</h2>
        </div>
      </div>
      <div className="container mt-5">
        <div className="mb-3">
          <label htmlFor="exampleInput" className="form-label large-label">URL</label>
          <input type="text" className="form-control large-input" id="exampleInput" placeholder="example" onChange={handleInputValue}></input>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="mb-3">
          <a onClick={fetchData} class="rainbow-button rainbow-button-text" alt="Generate Summary"></a>
        </div>
      </div>
      <div className="container mt-5 text-container">
          <div className="container mb-5 inner-text-container">
          {loading && <Bars/>}
          {error && <div>Error: {error.message}</div>}
          {data && (<p className='text-container-text'>{data.summary}</p>)}
          </div>
        </div>
    </div>
  )
}

export default App;
