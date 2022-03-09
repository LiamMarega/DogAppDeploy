import React from "react";
import { Link } from "react-router-dom";
import "./Boton.css";

export default function Title() {
  return (
    <div className="Title">
      <Link to="/home">
        <button id="botonR" class="name noselect">Enter</button>
      </Link>
    </div>
  );
}
