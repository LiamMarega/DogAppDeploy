import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css"
import Title from "../TitleLandingPage/Title";
import Boton from "../TitleLandingPage/Boton";
import Spinner from "../Spinner/Spinner"
import {LoginButton} from "../Login/Login"



export default function LandingPage(){

  

    return (
      <div className="LandingPage">
        <div>
          <Title id="titulo" />
        </div>
        <br />
        <br />
        <div>
          <LoginButton  />
        </div>
      </div>
    );
}