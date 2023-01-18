import { Component } from "react";
import "./ProductDetails.scss";
import ProductAllAttributes from "../ProductAllAttributes/ProductAllAttributes";
import Price from "../Price/Price";
import ProductHeader from "../ProductHeader/ProductHeader";
import ParsedHtml from "../ParsedHtml/ParsedHtml";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import getDefaultProductAttributes from "../../helpers/getDefaultProductAttributes";
import { connect } from "react-redux";

class ProductDetails extends Component {

    constructor(props){
        super(props)
        this.productDetails = this.props.productDetails;
        this.addProductToCart = this.props.addProductToCart;

        this.changeProductAttributesStates = this.changeProductAttributesStates.bind(this);
        this.state = {
            productAttributesStates: []
        }
    }

    async componentDidMount(){

        // Set init product attributes states to default values
        const initProductAttributesStates = await getDefaultProductAttributes(this.productDetails.id);

        this.setState({productAttributesStates: initProductAttributesStates})
    }

    // Changes current attribute value to new picked option
    changeProductAttributesStates(attrId, newOptionParams){

        const newProductAttributesStates = this.state.productAttributesStates.map(attr => {

            if (attr.attrId === attrId) attr.optionParams = newOptionParams;

            return attr;
        }) 

        this.setState({productAttributesStates: newProductAttributesStates});
    }
    
    render(){

        const {id, name, brand, attributes, prices, description, inStock} = this.productDetails;

        const price = prices.find(price => price.currency.symbol === this.props.currentCurrencySymbol)

        return (
            <div 
                className="product-details"
                id={id}
            >

                <ProductHeader 
                    name={name} 
                    brand={brand}
                />

                <ProductAllAttributes 
                    attributes={attributes}
                    areAttrsEditable={true}
                    productId={id}
                    productAttributesStates={this.state.productAttributesStates}
                    changeProductAttributesStates={this.changeProductAttributesStates}
                />

                <Price 
                    symbol={price.currency.symbol} 
                    amount={price.amount}
                />

                <AddToCartBtn 
                    disabled={!inStock}
                    addProductToCart={this.addProductToCart}
                    productId={this.productDetails.id}
                    productAttributesStates={this.state.productAttributesStates}
                />

                <ParsedHtml
                    html={description}    
                />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    const currentCurrencySymbol = state.rootReducer.currentCurrencySymbol;

    return {
        currentCurrencySymbol
    }
}

export default connect(mapStateToProps, null)(ProductDetails);