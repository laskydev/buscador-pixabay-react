import React, { useState } from 'react'
import { Error } from './Error'

export const Form = ({setSearch}) => {
    const [word, setWord] = useState('')
    const [error, setError] = useState(false)

    const imageSearch = (e) =>{
        e.preventDefault();

        //Validation
        if(word.trim()=== ''){
            setError(true)
            return
        }
        //Send search word to principal component
        setError(false)
        setSearch(word)
    }
    return (
        <form
            onSubmit={imageSearch}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o café"
                        onChange={e=>setWord(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error&& <Error message="Agrega un término de busqueda"/>}
        </form>
    )
}
