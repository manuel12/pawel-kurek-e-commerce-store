import { Component } from "react";
import { connect } from "react-redux";
import CartProductPhotos from "../CartProductPhotos/CartProductPhotos";
import CartProductQuantity from "../CartProductQuantity/CartProductQuantity";
import MiniCartElementDetails from "../MiniCartElementDetails/MiniCartElementDetails";
import './MiniCartElement.scss';

class MiniCartElement extends Component {

    constructor(props){
        super(props)
        this.updateProductCartQuantity = this.props.updateProductCartQuantity;
        this.changeAttrValue = this.props.changeAttrValue;

        this.handleQuantityIncrease = this.handleQuantityIncrease.bind(this);
        this.handleQuantityDecrease = this.handleQuantityDecrease.bind(this);

        this.size = "small"
    }

    handleQuantityIncrease(){
        this.updateProductCartQuantity(this.props.cartElementParams, this.props.cartElementParams.quantity + 1)
    }

    handleQuantityDecrease(){
        this.updateProductCartQuantity(this.props.cartElementParams, this.props.cartElementParams.quantity - 1)
    }

    render(){

        return (
            <div className="mini-cart-element">
                <MiniCartElementDetails
                    product={this.props.product}
                    changeAttrValue={this.changeAttrValue}
                    selectedAttributes={this.props.selectedAttributes}
                    cartElementParams={this.props.cartElementParams}
                    size={this.size}
                />
                <CartProductQuantity
                    handleQuantityIncrease={this.handleQuantityIncrease}
                    handleQuantityDecrease={this.handleQuantityDecrease}
                    cartElementParams={this.props.cartElementParams}
                    updateProductCartQuantity={this.updateProductCartQuantity}
                    size={this.size}
                />

                <CartProductPhotos
                    isSliderVisible={false}
                    productPhotos={this.props.product.gallery}
                    size={this.size}
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
  
export default connect(mapStateToProps, null)(MiniCartElement);
