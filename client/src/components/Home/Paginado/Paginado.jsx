import React from 'react';
import "./Paginado.css"

function Paginado({dogsPerPage, allDogs, paginado }){
    const cantPaginas = [];

    for (let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {

       cantPaginas.push(i + 1);   
    }

    return(
        <nav>
            <ul className="paginado">
                {
                   cantPaginas && cantPaginas.map(number => (
                       <ul className="numero" key={number}>
                           <a onClick={() => paginado(number)}>{number}</a>
                       </ul>
                       
                   ))
                }
            </ul>
        </nav>
    )

}

export default Paginado;