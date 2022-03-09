import axios from "axios";

  //---------***************CONSTANTES***************---------//


export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_TEMPERAMENTS = "FILTER_TEMPERAMENTS";
export const FILTER_DOG_CREATED = "FILTER_DOG_CREATED";
export const FILTER_ORDER = "FILTER_ORDER";
export const GET_NAME = "GET_NAME";
export const POST_DOGS = "POST_DOGS";
export const FILTER_WEIGHT = "FILTER_WEIGHT";
export const GET_DETAILS = "GET_DETAILS";


  //---------***************ACTIONS***************---------//


export function getDogs() {
  return async function (dispatch) {
    var respuesta = await axios.get("/dogs");
    return dispatch({
      type: GET_DOGS,
      payload: respuesta.data,
    });
  };
}

export function getDetailsDogs(id) {
  return async function (dispatch) {
      var respuesta = await axios.get("/dogs/" + id);
    return dispatch({
      type: GET_DETAILS,
      payload: respuesta.data,
    });
  };
}

export function postDogs(payload) {
  return async function (dispatch) {
    var respuesta = await axios.post("/dogs", payload);
    return {
      type: POST_DOGS,
      payload: respuesta,
    };
  };
}

export function getName(payload) {
  return async function (dispatch) {
    try {
      var respuesta = await axios.get(
      "/dogs?name=" + payload
    );
    return dispatch({
      type: GET_NAME,
      payload: respuesta.data,
    }); 
    } catch (error) {
      console.log(error);
    }   
  };
}

export function getTemperaments(payload) {
  return async function (dispatch) {
    var respuesta = await axios.get("/temperament");
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: respuesta.data,
    });
  };
}

export function filterTemperaments(payload) {
  return {
    type: FILTER_TEMPERAMENTS,
    payload
  };
}

export function filterDogsCreated(payload) {
  return{
    type: FILTER_DOG_CREATED,
    payload
  }
}

export function filterOrder(payload) {
  return {
    type: FILTER_ORDER,
    payload,
  };
}

export function filterWeight(payload) {
  return {
    type: FILTER_WEIGHT,
    payload,
  };
}



