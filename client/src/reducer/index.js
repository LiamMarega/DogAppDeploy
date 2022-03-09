import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  FILTER_TEMPERAMENTS,
  FILTER_DOG_CREATED,
  FILTER_ORDER,
  GET_NAME,
  POST_DOGS,
  FILTER_WEIGHT,
  GET_DETAILS,
} from "../actions";


const initialState = {
  dogs: [],
  allDogs: [],
  dogui: [],
  filteredDogs: [],
  temperaments: [],
  filtertemperaments: [],
  details: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          dogs: action.payload,
          dogui: action.payload,
        };

      case GET_NAME:
        return {
          ...state,
          dogs: action.payload,
        };

      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperaments: action.payload,
        };

      case POST_DOGS:
        return {
          ...state,
        };

      case GET_DETAILS:
        return {
          ...state,
          details: action.payload,
        };

      case FILTER_TEMPERAMENTS:
        const allDogs = state.dogui;
        const statusFilter =
          action.payload === "Temperaments"
            ? allDogs
            : allDogs.filter((el) => {
                if (el.temperament && el.temperament.includes(action.payload))
                  return el;
              })
        return {
          ...state,
          dogs: statusFilter,
        };

      case FILTER_DOG_CREATED:
        // const doguii = state.dogui;
        const filterCreated =
          action.payload === "Creados"
            ? state.dogui.filter((i) => i.createdInDb)
            : state.dogui.filter((i) => !i.createdInDb);
        return {
          ...state,
          dogs: action.payload === "Todos" ? state.dogui : filterCreated,
        };

      case FILTER_ORDER:
        const orderName =
          action.payload === "Asc"
            ? state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (b.name > a.name) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (b.name > a.name) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          dogs: orderName,
        };

      case FILTER_WEIGHT:
        const orderWeight =
          action.payload === "Pesado"
            ? state.dogs.sort(function (a, b) {
              
                if (
                  Number(a.weight.metric?.split(" - ")[0]) > Number(b.weight.metric?.split(" - ")[0])
                ) {
                  return 1;
                }
                if (
                  Number(b.weight.metric?.split(" - ")[0]) >
                  Number(a.weight.metric?.split(" - ")[0])
                ) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort(function (a, b) {
                if (
                  Number(a.weight.metric?.split(" - ")[0]) >
                 Number(b.weight.metric?.split(" - ")[0])
                ) {
                  return -1;
                }
                if (
                  Number(b.weight.metric?.split(" - ")[0]) >
                  Number(a.weight.metric?.split(" - ")[0])
                ) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          dogs: orderWeight,
        };

      default:
        return state;
    }
}

export default rootReducer;