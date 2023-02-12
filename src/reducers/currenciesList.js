import getFromLocalStorage from "../helpers/getFromLocalStorage";
import saveToLocalStorage from "../helpers/saveToLocalStorage";

let initState = getFromLocalStorage("state").isCurrenciesListOpen || false;

const currenciesList = (state = initState, action) => {
    switch(action.type) {
        case "OPEN_CURRENCY_PICKER":
            return true;
        case "CLOSE_CURRENCY_PICKER":
            return false;
        case "TOGGLE_VISIBILITY":
            saveToLocalStorage("state", !state, "isCurrenciesListOpen")
            return !state;
        default:
            return state;
    }
}

export default currenciesList;