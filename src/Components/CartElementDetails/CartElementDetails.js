import { Component } from 'react';
import Price from '../Price/Price';
import ProductAllAttributes from '../ProductAllAttributes/ProductAllAttributes';
import ProductHeader from '../ProductHeader/ProductHeader';
import './CartElementDetails.scss';

class CartElementDetails extends Component {
    
    render(){

        const {id, name, attributes, prices, brand} = this.props.product;

        const price = prices.find(price => price.currency.symbol === this.props.currentCurrencySymbol)

        return (
            <div className='cart-element-details'>
                
                <ProductHeader 
                    name={name} 
                    brand={brand}
                />

                <Price 
                    symbol={price.currency.symbol} 
                    amount={price.amount}
                />
                
                <ProductAllAttributes 
                    productAttributesStates={this.props.selectedAttributes}
                    attributes={attributes}
                    productId={id}
                    areAttrsEditable={false}
                />

            </div>
        )
    }
}

export default CartElementDetails;