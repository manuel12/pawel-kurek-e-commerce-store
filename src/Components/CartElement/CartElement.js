import { Component } from "react";
import { connect } from "react-redux";
import allActions from "../../actions";
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
        this.updateProductCartQuantity(this.props.cartElementParams, this.props.cartElementParams.quantity + 1)
    }

    handleQuantityDecrease(){
        this.updateProductCartQuantity(this.props.cartElementParams, this.props.cartElementParams.quantity - 1)
    }

    render(){

        return (
            <div className="cart-element">
                <CartElementDetails
                    product={this.props.product}
                    selectedAttributes={this.props.selectedAttributes}
                    cartElementParams={this.props.cartElementParams}
                />
                <CartProductQuantity
                    handleQuantityIncrease={this.handleQuantityIncrease}
                    handleQuantityDecrease={this.handleQuantityDecrease}
                    quantity={this.props.cartElementParams.quantity}
                />

                <CartProductPhotos
                    isSliderVisible={true}
                    productPhotos={this.props.product.gallery}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    setCartElements: allActions.cartOverlayActions.toggleCartOverlay,
  }
  
const mapStateToProps = (state) => {

const currentCurrencySymbol = state.rootReducer.currentCurrencySymbol;

    return {
        currentCurrencySymbol,
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CartElement);