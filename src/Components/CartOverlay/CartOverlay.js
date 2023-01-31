import { PureComponent } from "react";
import MiniCart from "../MiniCart/MiniCart";
import "./CartOverlay.scss"

class CartOverlay extends PureComponent {

    constructor(props){
        super(props)
        this.updateProductCartQuantity = this.props.updateProductCartQuantity;
    }

    render(){
        return(
            <section className="cart-overlay">
                <div className="cart-overlay__background"></div>
                <MiniCart 
                    updateProductCartQuantity={this.updateProductCartQuantity}
                    totalCartCost={this.props.totalCartCost}
                />
            </section>
        )
    }
}

export default CartOverlay;