import { PureComponent } from "react";
import CartButton from "../CartButton/CartButton";
import CurrencyPicker from "../CurrencyPicker/CurrencyPicker";
import "./Actions.scss";

class Actions extends PureComponent {

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