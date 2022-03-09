import React from 'react';
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getName } from '../../../actions';
import "./SearchBar.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name);
    }

     function handleSubmit(e) {
       e.preventDefault();
       dispatch(getName(name));
       console.log(e);
     }

    return (
      <div className="bodySearch">
        <input
          className="inputSearch"
          type="text"
          placeholder="    Search dogs"
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className="buttonSearch"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          {"Search"}
        </button>
      </div>
    );
}

  
