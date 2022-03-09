//---------***************IMPORTACIONES***************---------//

import React from "react";
import { useState, useEffect } from "react";
import { postDogs, getTemperaments } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SelectTemperaments from "../SelectTemperaments";
import "./CreateDogs.css";

function controlDeErrores(input) {
  var error = [];
  if (!input.name) {
    error.name = "Debe ingresar el nombre de la Raza";
  }
  if (!input.height) {
    error.height = "Debe ingresar la altura de la Raza";
  }
  if (!input.weight) {
    error.weight = "Debe ingresar el peso de la Raza";
  }
  if (!input.life_span) {
    error.life_span = "Debe ingresar años de vida de la Raza";
  }
  if (!input.image) {
    error.image = "Debe ingresar una foto vida de la Raza";
  }
  return error;
}

//---------***************FUNCION PADRE CREATEDOGS***************---------//

export default function CreateDogs() {
  const dispatch = useDispatch();
  const temperamentos = useSelector((state) => state.temperaments);
  const [errores, setErrores] = useState({});

  const [input, setInput] = useState({
    name: "",
    weight: "",
    height: "",
    life_span: "",
    image: "",
    temps: [],
  });

  //---------***************FUNCIONES***************---------//

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrores(
      controlDeErrores({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temps: [...input.temps, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postDogs(input));
    alert("The dog was created successfully !!");
    
  }

  function handleDelete(e) {
    setInput({
      ...input,
      temps: input.temps.filter((temp) => temp !== e),
    });
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  //---------***************RENDER CREATE DOGS***************---------//

  return (
    <div className="create-container-padre">
      <div className="create-container">
        <div>
          <Link to="/home">
            <button>Back</button>
          </Link>
          <h1>¡Create your dog!</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Height:</label>
              <input
                type="text"
                value={input.height}
                name="height"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Weight:</label>
              <input
                type="text"
                value={input.weight}
                name="weight"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Image:</label>
              <input
                type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Life Span:</label>
              <input
                type="text"
                value={input.life_span}
                name="life_span"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>temperament:</label>
              <label>
                <select onChange={(e) => handleSelect(e)}>
                  {temperamentos?.map((i) => {
                    return <SelectTemperaments key={i.name} name={i.name} />;
                  })}
                </select>
              </label>
            </div>
            <div className="lista-temps">
              <br />
              <br />
              <ul className="lista-ul">
                <li>
                  {input.temps.map((el) => (
                    <div className="divv">
                      <div>
                        <p>{el}</p>
                        <button onClick={() => handleDelete(el)}>X</button>
                      </div>
                    </div>
                  ))}
                </li>
              </ul>
            </div>
            <br />
            <br />
                  <button type="submit">¡¡Create!!</button>
          </form>
        </div>
      </div>
      {errores.name && <p className="error">{errores.name}</p>}
      {errores.height && <p className="error">{errores.height}</p>}
      {errores.name && <p className="error">{errores.name}</p>}
      {errores.weight && <p className="error">{errores.weight}</p>}
    </div>
  );
}
