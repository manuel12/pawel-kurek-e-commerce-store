import { PureComponent } from "react";
import "./AddToCartBtn.scss";

class AddToCartBtn extends PureComponent {

    constructor(props){
        super(props)
        this.handleAddProductToCartButtonClick = this.handleAddProductToCartButtonClick.bind(this);
        this.addProductToCart = this.props.addProductToCart;
    }

    handleAddProductToCartButtonClick(){
        this.addProductToCart(this.props.productId, this.props.productAttributesStates)
    }

    render(){
        return (
            <a 
                className={`add-to-cart-btn ${this.props.disabled ? "disabled" : ""}`}
                href="/cart"
                onClick={this.handleAddProductToCartButtonClick}
            >
                ADD TO CART
            </a>
        )
    }
}

export default AddToCartBtn;