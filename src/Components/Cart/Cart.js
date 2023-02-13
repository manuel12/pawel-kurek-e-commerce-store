import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

                {this.props.cartElements.length > 0 ?
                    <>
                        {
                            this.props.cartElements.map((cartElement, index) => {
                                return (
                                    <React.Fragment key={"cart__element" + index}>
                                        <CartElement
                                            updateProductCartQuantity={this.updateProductCartQuantity}
                                            cartElement={cartElement}
                                        />
                                        <hr/>
                                    </React.Fragment>
                                ) 
                            })
                        }

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
  
const mapStateToProps = (state) => {

    const cartElements = state.rootReducer.cartElements;

    return {
        cartElements
    }
}
  
export default connect(mapStateToProps, null)(Cart);