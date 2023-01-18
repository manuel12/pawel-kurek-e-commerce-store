import { Component } from "react";
import CartButton from "../CartButton/CartButton";
import CurrencyPicker from "../CurrencyPicker/CurrencyPicker";
import "./Actions.scss";

class Actions extends Component {

    render() {
        return (
            <div className="actions">
                <CurrencyPicker/>
                <CartButton/>
            </div>
        )
    }
}

export default Actions;