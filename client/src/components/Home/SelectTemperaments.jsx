import React from "react";

 function selectTemperaments({name}) {
  return (
      <option value={name}>{name}</option>
  );
}

export default selectTemperaments;