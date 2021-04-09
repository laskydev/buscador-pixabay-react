import React, { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { Form } from './components/Form';
import { ImagesList } from './components/ImagesList';

function App() {

  //State of app
  const [search, setSearch] = useState('')
  const [images, setImages] = useState([])
  const [actualPage, setActualPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  useEffect(()=>{
    const callToAPI = async () =>{
      if(search === '') return;

      const imagesForPage = 30;
      const key = '21085089-1df02356d4184600e878e6574'
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesForPage}&page=${actualPage}`;

      const response = await fetch(url)
      const result = await response.json()

      setImages(result.hits)

      //Calculate total pages number
      const calculateTotalPages = Math.ceil(result.totalHits / imagesForPage)
      setTotalPages(calculateTotalPages)
    }

    callToAPI()

    //Move view to top
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({behavior: 'smooth'})

    
  },[search, actualPage])

  //Define previous page
  const previousPage = () =>{
    const newActualPage = actualPage -1;
    if (newActualPage  === 0) return
    setActualPage(newActualPage)
  }

  //Define next page
  const nextPage = () =>{
    const newActualPage = actualPage + 1;
    if (newActualPage  > totalPages) return
    setActualPage(newActualPage)
  }
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Form
          setSearch={setSearch}
        />
      </div>
      <div className="row justify-content-center">
        <ImagesList
          images={images}
        />
        {(actualPage===1) ? null : (
            <button
            type="button"
            className="btn btn-info mr-1 mb-3"
            onClick={previousPage}
          >&laquo; Anterior</button>
        )}
        {(actualPage === totalPages) ? null : (
            <button
            type="button"
            className="btn btn-info mb-3"
            onClick={nextPage}
          >Siguiente &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
