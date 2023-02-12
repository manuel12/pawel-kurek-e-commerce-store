import getFromLocalStorage from "../helpers/getFromLocalStorage";
import saveToLocalStorage from "../helpers/saveToLocalStorage";

let initState = getFromLocalStorage("state").cartElements || [];

const cartElements = (state = initState, action) => {
    switch(action.type){
        case "SET_CART_ELEMENTS":
            saveToLocalStorage("state", action.payload, "cartElements");
            return action.payload
        default:
            return state;
    }
}

export default cartElements;