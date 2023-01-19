import { Component } from "react";
import { connect } from "react-redux";
import allActions from "../../actions";
import './CartButton.scss'

class CartButton extends Component {

    render() {

        const itemsQuantity = this.props.cartElements.map(cartEl => cartEl.quantity).reduce((acc, cur) => acc + cur, 0);
        
        return (
            <div className="cart-button">
                <button 
                    className="cart-button__btn"
                    onClick={this.props.toggleCartOverlay}
                >
                    {
                        itemsQuantity > 0 &&
                        <span className="cart-button__items-count">
                            {itemsQuantity}
                        </span>
                    }
                    
                    <img src="/assets/img/cart-dark.svg" alt="cart" className="cart-button__image"/>
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    toggleCartOverlay: allActions.cartOverlayActions.toggleCartOverlay,
}

const mapStateToProps = (state) => {
    const cartElements = state.rootReducer.cartElements;

    return {
        cartElements
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);