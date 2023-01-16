import getFromLocalStorage from "../helpers/getFromLocalStorage";
import saveToLocalStorage from "../helpers/saveToLocalStorage";

let initState;

if (getFromLocalStorage("state") === undefined || getFromLocalStorage("state").cartElements === undefined) {

    saveToLocalStorage("state", {
        ...getFromLocalStorage("state"),
        cartElements: []
    })
    initState = [];

} else {
    initState = getFromLocalStorage("state").cartElements;
}

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