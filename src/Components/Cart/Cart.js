import React, { Component } from "react";
import { connect } from "react-redux";
import allActions from "../../actions";
import CartElement from "../CartElement/CartElement";
import "./Cart.scss";

class Cart extends Component {

    constructor(props){
        super(props)
        this.updateProductCartQuantity = this.props.updateProductCartQuantity;
        this.updateElementInCart = this.props.updateElementInCart;
    }
    
    render(){
        return (
            <section className="cart">
                <h2 className="cart__header">CART</h2>
                <hr/>
                {
                    this.props.cartElements.map((cartElement, index) => {

                        if (cartElement.quantity > 0) {
                            return (
                                <React.Fragment key={"cart__element" + index}>
                                    <CartElement
                                        updateProductCartQuantity={this.updateProductCartQuantity}
                                        cartElementParams={cartElement}
                                        product={cartElement.product}
                                        selectedAttributes={cartElement.selectedAttributes}
                                    />
                                    <hr/>
                                </React.Fragment>
                            )
                        } else {
                            return false
                        }   
                        
                    }).filter(Boolean)
                }
            </section>
        )
    }
}

const mapDispatchToProps = {
    setCartElements: allActions.cartOverlayActions.toggleCartOverlay,
  }
  
const mapStateToProps = (state) => {

const currentCurrencySymbol = state.rootReducer.currentCurrencySymbol;
const cartElements = state.rootReducer.cartElements;

return {
    currentCurrencySymbol,
    cartElements
}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);