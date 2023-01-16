import React, { Component } from 'react';
import Main from '../../Layouts/Main/Main';
import Header from '../../Layouts/Header/Header';
import './App.scss';
import querySingleProduct from '../../queries/querySingleProduct';
import getDefaultProductAttributes from '../../helpers/getDefaultProductAttributes';
import { connect } from 'react-redux';
import allActions from '../../actions';
import { copyObject } from '../../helpers/copyObject';

class App extends Component {

  constructor(){
    super()
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  addProductToCart = async (productId, selectedAttributes) => {

    const product = await querySingleProduct(productId);

    const productAttributes = selectedAttributes ? selectedAttributes : await getDefaultProductAttributes(productId);

    if (this.props.cartElements.length > 0) {

      let isExistingProductQuantityUpdated = false;
      const updatedCartElements = [];

      this.props.cartElements.forEach(element => {

        const elementCopy = copyObject(element);
  
        // Check if that type of product exists in cart by comparing ID's
        if (element.product.id === product.id) {

          const newProductAttributesStates = JSON.stringify(productAttributes);
          const cartElementAttributesStates = JSON.stringify(elementCopy.selectedAttributes);
          
          // If product exists and has the same attributes, increment it's quantity
          if (newProductAttributesStates === cartElementAttributesStates) {
            
            elementCopy.quantity += 1;
            isExistingProductQuantityUpdated = true;

          }
        
        }

        updatedCartElements.push(elementCopy);
      })


      // If we don't update existing product order quantity, add new product to cart 
      if (!isExistingProductQuantityUpdated) {

        const orderedProduct = {
          product: product,
          selectedAttributes: productAttributes,
          quantity: 1,
        };

        updatedCartElements.push(orderedProduct);
      }

      this.props.setCartElements(updatedCartElements);
      
    } else {

      const orderedProduct = {
        product: product,
        selectedAttributes: productAttributes,
        quantity: 1
      };
        
      this.props.setCartElements([...this.props.cartElements, orderedProduct]);
    }

  }

  render(){
    return (
      <div className="app">

        <Header/>

        <Main 
          addProductToCart={this.addProductToCart}
        />

      </div>
    )
  }
}

const mapDispatchToProps = {
  setCartElements: allActions.cartElementsActions.setCartElements
}

const mapStateToProps = (state) => {
  
  const cartElements = state.rootReducer.cartElements;
  
  return {
      cartElements
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
