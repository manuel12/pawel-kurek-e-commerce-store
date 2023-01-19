import getFromLocalStorage from "../helpers/getFromLocalStorage"
import saveToLocalStorage from "../helpers/saveToLocalStorage";

let initState;

if (getFromLocalStorage("state") === undefined || getFromLocalStorage("state").isCartOverlayVisible === undefined) {

    initState = false;
    
    saveToLocalStorage("state", {
        ...getFromLocalStorage("state"),
        isCartOverlayVisible: false
    })

} else {
    initState = getFromLocalStorage("state").isCartOverlayVisible;
}

const cartOverlay = (state = initState, action) => {
    switch(action.type) {
        case "TOGGLE_CART_OVERLAY":
            const newState = !state;
            saveToLocalStorage("state", newState, "isCartOverlayVisible");
            return newState;
        default:
            console.log(state, "cart overlay reducer")
            return state;
    }
}

export default cartOverlay;