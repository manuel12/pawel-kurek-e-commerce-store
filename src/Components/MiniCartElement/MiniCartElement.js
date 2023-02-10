import { PureComponent } from "react";
import { connect } from "react-redux";
import CartProductPhotos from "../CartProductPhotos/CartProductPhotos";
import CartProductQuantity from "../CartProductQuantity/CartProductQuantity";
import MiniCartElementDetails from "../MiniCartElementDetails/MiniCartElementDetails";
import './MiniCartElement.scss';

class MiniCartElement extends PureComponent {

    constructor(props){
        super(props)
        this.updateProductCartQuantity = this.props.updateProductCartQuantity;
        this.handleQuantityIncrease = this.handleQuantityIncrease.bind(this);
        this.handleQuantityDecrease = this.handleQuantityDecrease.bind(this);

        this.size = "small"
    }

    handleQuantityIncrease(){
        this.updateProductCartQuantity(this.props.cartElement, this.props.cartElement.quantity + 1)
    }

    handleQuantityDecrease(){
        this.updateProductCartQuantity(this.props.cartElement, this.props.cartElement.quantity - 1)
    }

    render(){

        return (
            <div className="mini-cart-element">
                <MiniCartElementDetails
                    product={this.props.cartElement.product}
                    selectedAttributes={this.props.cartElement.selectedAttributes}
                    cartElementParams={this.props.cartElement}
                    size={this.size}
                />
                <CartProductQuantity
                    handleQuantityIncrease={this.handleQuantityIncrease}
                    handleQuantityDecrease={this.handleQuantityDecrease}
                    quantity={this.props.cartElement.quantity}
                    size={this.size}
                />

                <CartProductPhotos
                    isSliderVisible={false}
                    productPhotos={this.props.cartElement.product.gallery}
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
