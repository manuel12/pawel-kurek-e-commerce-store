import { Component } from 'react';
import { connect } from 'react-redux';
import Price from '../Price/Price';
import ProductAllAttributes from '../ProductAllAttributes/ProductAllAttributes';
import ProductHeader from '../ProductHeader/ProductHeader';
import './MiniCartElementDetails.scss';

class MiniCartElementDetails extends Component {

    constructor(props){
        super(props)
        this.product = this.props.product;
    }
    
    render(){

        const {id, name, attributes, prices, brand} = this.product;

        const price = prices.find(price => price.currency.symbol === this.props.currentCurrencySymbol)

        return (
            <div className='mini-cart-element-details'>
                
                <ProductHeader 
                    name={name} 
                    brand={brand}
                    size={this.props.size}
                />

                <Price 
                    symbol={price.currency.symbol} 
                    amount={price.amount}
                    size={this.props.size}
                />
                
                <ProductAllAttributes 
                    productAttributesStates={this.props.selectedAttributes}
                    attributes={attributes}
                    productId={id}
                    size={this.props.size}
                    areAttrsEditable={false}
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
  
export default connect(mapStateToProps, null)(MiniCartElementDetails);