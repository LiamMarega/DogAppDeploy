import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

  //---------***************ACTIONS***************---------//


import {
  getDogs,
  getTemperaments,
  filterDogsCreated,
  filterOrder,
  filterTemperaments,
  filterWeight,
} from "../../actions";

  //---------***************COMPONENTES***************---------//


import Card from "../Card/Card";
import Paginado from "./Paginado/Paginado";
import SelectTemperaments from "../Home/SelectTemperaments";
import SearchBar from "../Home/SearchBar/SearchBar";
import "./Home.css";

  //---------***************ESTADOS***************---------//


export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [ordenado, setOrdenado] = useState("");


  //---------***************FUNCIONES***************---------//

  
  useEffect(() => {
    dispatch(getDogs());
    
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleCreated(e) {
    e.preventDefault();
    dispatch(filterDogsCreated(e.target.value));
  }

  function handleFilterTemperament(e) {
    e.preventDefault();
    dispatch(filterTemperaments(e.target.value));
    setOrdenado(`Ordenadoo ${e.target.value}`);
  }

  function handleOrder(e) {
     e.preventDefault();
    dispatch(filterOrder(e.target.value));
    setCurrentPage(1);
    setOrdenado(`Ordenadooo ${e.target.value}`);
    console.log(e.target.value);
  }

 function handleOrderWeight(e) {
   e.preventDefault();
   dispatch(filterWeight(e.target.value));
   setOrdenado(`Ordenadoooo ${e.target.value}`);
 }


  //---------***************PAGINADO***************---------//

  const [currentPage, setCurrentPage] = useState(1); // Estados de Paginas
  const [dogsPerPage, setDogsPerPage] = useState(8); // Cantidad de perros por pagina
  const indexOfLastDog = currentPage * dogsPerPage; // INDICE DE ULTIMO PERSONAJE:  Tendria que ser 8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // INDICE DE PRIMER PERSONAJE:  Tendria que ser 0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog );

  const paginado = (pagNumber) => {
    setCurrentPage(pagNumber);
  };

  //---------***************RENDER HOME***************---------//


  return (
    <div className="dogs">
      <div id="nav">
        {/* linkeo la ruta "/characters" */}
        <div className="CreateDog">
          <div id="crearRaza">
            <Link className="TextDog" to="/dogs">
              Create <br />
              Dog{" "}
            </Link>
          </div>
          <div id="mostrarRazas"></div>
        </div>

        {/*// Boton para recargar las razas por defecto */}
        <div className="conteiner-SearchBar">
          <div className="SearchBar">
            <SearchBar />
          </div>
        </div>
        <div className="container-Filtrados">
          <div className="Filtrados">
            <div>
              <select
                className="selects"
                onChange={(e) => handleFilterTemperament(e)}
              >
                {allTemperaments?.map((i) => {
                  return <SelectTemperaments name={i.name} />;
                })}
              </select>
              <select className="selects" onChange={(e) => handleCreated(e)}>
                <option value="Todos">All dogs</option>
                <option value="Creados">Dogs added</option>
                <option value="Api">Existing dogs</option>
              </select>
              <select
                className="selects"
                onChange={(e) => handleOrderWeight(e)}
              >
                <option value="Pesado">Heavier</option>
                <option value="Liviano">Lighter</option>
              </select>
              <select className="selects" onChange={(e) => handleOrder(e)}>
                <option value="Asc">Asc ↑A - Z↑</option>
                <option value="Desc">Des ↓Z -A↓</option>
              </select>
            </div>
          </div>
          <div className="button">
            <button
              className="button-search"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Show the dogs again!
            </button>
          </div>
        </div>
      </div>
      <br />
      <div>
        <p>{currentPage}</p>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>
      <div className="containerDogs">
        {currentDogs?.map((i) => {
          return (
            <div class="dogs">
              <Link to={"/details/" + i.id}>
                <Card
                  name={i.name}
                  weight={i.weight.metric ? i.weight.metric : i.weight}
                  temperament={i.temperament ? i.temperament : i.temperaments}
                  image={
                    i.reference_image_id
                      ? `https://cdn2.thedogapi.com/images/${i.reference_image_id}.jpg`
                      : i.image
                  }
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
