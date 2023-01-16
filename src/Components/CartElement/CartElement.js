import { Component } from "react";
import { connect } from "react-redux";
import CartElementDetails from "../CartElementDetails/CartElementDetails";
import CartProductPhotos from "../CartProductPhotos/CartProductPhotos";
import CartProductQuantity from "../CartProductQuantity/CartProductQuantity";
import './CartElement.scss';

class CartElement extends Component {

    constructor(props){
        super(props)
        this.updateProductCartQuantity = this.props.updateProductCartQuantity;
        this.handleQuantityIncrease = this.handleQuantityIncrease.bind(this);
        this.handleQuantityDecrease = this.handleQuantityDecrease.bind(this);
    }

    handleQuantityIncrease(){
        this.updateProductCartQuantity(this.props.cartElement, this.props.cartElement.quantity + 1)
    }

    handleQuantityDecrease(){
        this.updateProductCartQuantity(this.props.cartElement, this.props.cartElement.quantity - 1)
    }

    render(){

        return (
            <div className="cart-element">
                <CartElementDetails
                    product={this.props.cartElement.product}
                    selectedAttributes={this.props.cartElement.selectedAttributes}
                    cartElementParams={this.props.cartElement}
                />
                <CartProductQuantity
                    handleQuantityIncrease={this.handleQuantityIncrease}
                    handleQuantityDecrease={this.handleQuantityDecrease}
                    quantity={this.props.cartElement.quantity}
                />

                <CartProductPhotos
                    isSliderVisible={true}
                    productPhotos={this.props.cartElement.product.gallery}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    const currentCurrencySymbol = state.rootReducer.currentCurrencySymbol;

        return {
            currentCurrencySymbol,
        }
    }
  
export default connect(mapStateToProps, null)(CartElement);