import { PureComponent } from "react";
import { connect } from "react-redux";
import "./ProductCard.scss";

class ProductCard extends PureComponent {

    constructor(props){
        super(props)
        this.addProductToCart = this.props.addProductToCart;
    }

    showAddToCartBtn(e){

        if (e.target.className === "product-card ") {

            // Hide add to cart button for all button that has no mouse over
            const allProducts = [...e.target.parentNode.children]

            allProducts.forEach(product => {
                product.children[2].style.display = "none";
            });

            // Show button for product that has mouse over
            const activeProduct = [...e.target.children][2]

            activeProduct.style.display = "flex";
        }
    }

    handleRedirectToDetails(e, productId){
        if (e.target.className === "product-card__add-to-cart") return;
        window.location.pathname = `/product/${productId}`
    }

    render(){
        
        const {id, name, brand, gallery, prices, inStock} = this.props.productParams;

        const {currency, amount} = prices.find(price => (
            price.currency.symbol === this.props.currentCurrencySymbol
        ));

        const {symbol} = currency;

        return(
            <section 
                id={id} 
                className={`product-card ${inStock ? "" : "out-of-stock"}`}
                onMouseOver={this.showAddToCartBtn.bind(this)}
                onClick={this.handleRedirectToDetails.bind(this)}
            >

                <div className="product-card__photo-container">
                    <img className="product-card__photo" src={gallery[0]} alt="product"/>
                    {
                        !inStock &&
                        <p className="product-cart__photo-out-of-stock-info">OUT OF STOCK</p>
                    }
                </div>
                
                <div className="product-card__description">
                    <span className="product-card__title">{brand} {name}</span>
                    <span className="product-card__price">{symbol}{amount}</span>
                </div>

                <button 
                    className="product-card__add-to-cart"
                    onClick={() => this.addProductToCart(this.props.productId)}
                >
                    <img className="product-card__cart-image" src="/assets/img/cart-white.svg" alt="cart"/>
                </button>

            </section>
        )
    }
}

const mapStateToProps = (state) => {

    const currentCurrencySymbol = state.rootReducer.currentCurrencySymbol;

    return {
        currentCurrencySymbol
    }
}
  
export default connect(mapStateToProps, null)(ProductCard);