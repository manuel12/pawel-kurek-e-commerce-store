import React, { Component } from "react";
import { connect } from "react-redux";
import allActions from "../../actions";
import CartElement from "../CartElement/CartElement";
import CartTotalCost from "../CartTotalCost/CartTotalCost";
import "./Cart.scss";

class Cart extends Component {

    constructor(props){
        super(props)
        this.updateProductCartQuantity = this.props.updateProductCartQuantity;
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
                                        cartElement={cartElement}
                                    />
                                    <hr/>
                                </React.Fragment>
                            )
                        } else {
                            return false
                        }   
                        
                    }).filter(Boolean)
                }

                <CartTotalCost
                    totalCartCost={this.props.totalCartCost}
                />

                <a 
                    href="/"
                    className="cart__order-link"
                    onClick={this.props.toggleCartOverlay}
                >
                    ORDER
                </a>

            </section>
        )
    }
}

const mapDispatchToProps = {
    setCartElements: allActions.cartElementsActions.setCartElements,
  }
  
const mapStateToProps = (state) => {

    const cartElements = state.rootReducer.cartElements;

    return {
        cartElements
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);