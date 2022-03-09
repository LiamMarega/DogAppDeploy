import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsDogs } from "../../actions/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


import "./Details.css"

export default function Detail(){
  
  const myDogs = useSelector ((state) => state.details)
  console.log(myDogs)

    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetailsDogs(id));
    },[id,dispatch])

    function dogTemperament() {
      var str = "";
       for (let i = 0; i < myDogs[0].temperaments.length; i++) {
        str = str + myDogs[0].temperaments[i].name + ", "
      }
      return str;
    }

    return (
      <div>
        <div className="details-container-padre">
          <div className="details-container">
            <div>
              {myDogs.length > 0 ? (
                <div className="details">
                  <h1>{myDogs[0].name}</h1>
                  <img
                    className="img-detail"
                    src={myDogs[0].image ? myDogs[0].image : myDogs[0].img}
                    alt="img"
                  />
                  <h3>{dogTemperament()}</h3>
                  <br />
                  <h3>Life of Year: {myDogs[0].life_span}</h3>
                  <h4> weight: {myDogs[0].weight}</h4>
                  <h5>{myDogs[0].height}</h5>
                </div>
              ) : (
                <div className="details">
                  <h1>{myDogs.name}</h1>
                  <img
                    className="img-detail"
                    src={myDogs.image ? myDogs.image : myDogs.img}
                    alt="loading"
                  />
                  <h3>{myDogs.temperament}</h3>
                  <br />
                  <h3>Life of Year: {myDogs.life_span}</h3>
                  <h4> weight: {myDogs.weight}</h4>
                  <h5>{myDogs.height}</h5>
                </div>
              )}
            </div>
          </div>
        </div>
        <Link to="/home">
          <button>Back</button>
        </Link>
      </div>
    );
}