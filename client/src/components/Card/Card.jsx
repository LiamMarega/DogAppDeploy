import React from "react"
import "./Card.css";

//  NOTA PARA MI: si image no anda probar "img"
 function Card({ name, image, temperament, weight }) {
   return (
     <div class="contenedor">
       <div class="informacion">
         <h5>Weight {weight}</h5>
         <h4>
           
           {temperament  }
         </h4>
         <h5>min {weight} max</h5>
       </div>
       <h3 class="name">{name}</h3>

       <img src={image} alt="No se encontro" />
     </div>
   );
 }

export default Card;