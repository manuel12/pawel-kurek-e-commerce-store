import React, { Component } from "react";
import { connect } from "react-redux";
import allActions from "../../actions";
import CartElement from "../CartElement/CartElement";
import "./Cart.scss";

class Cart extends Component {

    constructor(props){
        super(props)
        this.updateElementInCart = this.props.updateElementInCart;
        this.updateProductCartQuantity = this.updateProductCartQuantity.bind(this);
        this.eraseZeroQuantityCartElements = this.eraseZeroQuantityCartElements.bind(this);
    }

    updateProductCartQuantity = (cartProduct, quantity) => {

        const productToUpdate = JSON.stringify(cartProduct);
        const cartElementsCopy = JSON.parse(JSON.stringify(this.props.cartElements));
    
        // Update quantity of particular product and delete if from cart if it's quantity is 0
        let updatedCartElements = []

        cartElementsCopy.forEach(cartEl => {
        
          if (JSON.stringify(cartEl) === productToUpdate) {
            cartEl.quantity = quantity;

            if (cartEl.quantity > 0) {
                updatedCartElements.push(cartEl)
            }

          } else {
            updatedCartElements.push(cartEl)
          }
    
        });

        updatedCartElements = this.eraseZeroQuantityCartElements(updatedCartElements);

        this.props.setCartElements(updatedCartElements);
    }

    eraseZeroQuantityCartElements(cartElements){
        return cartElements.filter(cartEl => cartEl.quantity > 0)
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
    setCartElements: allActions.cartElementsActions.setCartElements,
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