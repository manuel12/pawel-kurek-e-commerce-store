import { PureComponent } from "react";
import { Link } from "react-router-dom";
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
            <Link 
                className={`add-to-cart-btn ${this.props.disabled ? "disabled" : ""}`}
                to="/cart"
                onClick={this.handleAddProductToCartButtonClick}
            >
                ADD TO CART
            </Link>
        )
    }
}

export default AddToCartBtn;