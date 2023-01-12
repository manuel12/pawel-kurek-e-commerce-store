import { Component } from 'react';
import { connect } from 'react-redux';
import Price from '../Price/Price';
import ProductAllAttributes from '../ProductAllAttributes/ProductAllAttributes';
import ProductHeader from '../ProductHeader/ProductHeader';
import './CartElementDetails.scss';

class CartElementDetails extends Component {
    
    render(){

        console.log(this.props.product)

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

const mapStateToProps = (state) => {
    const currentCurrencySymbol = state.rootReducer.currentCurrencySymbol;

    return {
        currentCurrencySymbol
    }
}

export default connect(mapStateToProps, null)(CartElementDetails);