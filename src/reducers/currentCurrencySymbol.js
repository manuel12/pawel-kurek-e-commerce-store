import getFromLocalStorage from "../helpers/getFromLocalStorage"

const initState = getFromLocalStorage("state").currentCurrencySymbol;

const currentCurrencySymbol = (state = initState, action) => {
    switch(action.type) {
        case "GET_CURRENCY":
            return state;
        case "SET_CURRENCY":
            return action.payload;
        default:
            return state;
    }
}

export default currentCurrencySymbol;