import React, { Component } from "react";
import CartElement from "../CartElement/CartElement";
import "./Cart.scss";

class Cart extends Component {

    constructor(props){
        super(props)
        this.updateProductCartQuantity = this.props.updateProductCartQuantity;
        this.cartElements = this.props.cartElements;
        this.currentCurrencySymbol = this.props.currentCurrencySymbol;
        this.changeAttrValue = this.props.changeAttrValue;
    }

    render(){
        return (
            <section className="cart">
                <h2 className="cart__header">CART</h2>
                <hr/>
                {this.cartElements.map((cartElement, index) => {
                    return (
                        <React.Fragment key={"cartelement" + index}>
                            <CartElement
                                updateProductCartQuantity={this.updateProductCartQuantity}
                                cartElementParams={cartElement}
                                product={cartElement.product}
                                selectedAttributes={cartElement.selectedAttributes}
                                currentCurrencySymbol={this.currentCurrencySymbol}
                                changeAttrValue={this.changeAttrValue}
                            />
                            <hr/>
                        </React.Fragment>
                    )
                })}
            </section>
        )
    }
}

export default Cart;