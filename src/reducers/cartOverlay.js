import getFromLocalStorage from "../helpers/getFromLocalStorage"
import saveToLocalStorage from "../helpers/saveToLocalStorage";

let initState = getFromLocalStorage("state").isCartOverlayVisible || false;

const cartOverlay = (state = initState, action) => {
    switch(action.type) {
        case "TOGGLE_CART_OVERLAY":
            const newState = !state;
            saveToLocalStorage("state", newState, "isCartOverlayVisible");
            return newState;
        default:
            return state;
    }
}

export default cartOverlay;