import { Component } from 'react';
import Price from '../Price/Price';
import ProductAllAttributes from '../ProductAllAttributes/ProductAllAttributes';
import ProductHeader from '../ProductHeader/ProductHeader';
import './MiniCartElementDetails.scss';

class MiniCartElementDetails extends Component {

    constructor(props){
        super(props)
        this.product = this.props.product;
        this.changeAttrValue = this.props.changeAttrValue;
        this.changeProductAttributesStates = this.changeProductAttributesStates.bind(this);
        this.updateElementInCart = this.props.updateElementInCart;
        this.state = {
            productAttributesStates: this.props.selectedAttributes
        }
    }
    
    // Changes current attribute value to new picked option
    changeProductAttributesStates(attrId, newOptionParams){
        
        const newProductAttributesStates = this.state.productAttributesStates.map(attr => {
            
            if (attr.attrId === attrId) attr.optionParams = newOptionParams;
            
            return attr;
        }) 
        
        this.setState({productAttributesStates: newProductAttributesStates});
        this.updateElementInCart(this.product, this.state.productAttributesStates)
    }
    
    render(){

        const {name, attributes, prices, brand} = this.product;

        const price = prices.find(price => price.currency.symbol === this.props.currentCurrencySymbol)

        const headerStyles = {
            display: "none"
        }
        return (
            <div className='mini-cart-element-details'>
                
                <ProductHeader 
                    name={name} 
                    brand={brand}
                />

                <Price 
                    symbol={price.currency.symbol} 
                    amount={price.amount}
                    headerStyles={{
                        display: "none"
                    }}
                />
                <ProductAllAttributes 
                    productAttributesStates={this.state.productAttributesStates}
                    attributes={attributes}
                    changeAttrValue={this.changeAttrValue}
                    changeProductAttributesStates={this.changeProductAttributesStates}
                />

            </div>
        )
    }
}

export default MiniCartElementDetails;