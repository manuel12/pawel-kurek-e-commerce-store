import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import allActions from "../../actions";
import CartElement from "../CartElement/CartElement";
import CartSummary from "../CartSummary/CartSummary";
import "./Cart.scss";

class Cart extends PureComponent {

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

                {this.props.cartElements.length > 0 ?
                    <>
                        <CartSummary
                            totalCartCost={this.props.totalCartCost}
                        />

                        <Link 
                            to="/"
                            className="cart__order-link"
                            onClick={this.props.toggleCartOverlay}
                        >
                            ORDER
                        </Link>
                    </>
                    :
                    <p className="cart__no-items">There is no products in cart</p>
                }


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