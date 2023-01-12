import React, { Component } from 'react';
import Main from '../../Layouts/Main/Main';
import Header from '../../Layouts/Header/Header';
import './App.scss';
import querySingleProduct from '../../queries/querySingleProduct';
import getFromLocalStorage from '../../helpers/getFromLocalStorage';
import saveToLocalStorage from '../../helpers/saveToLocalStorage';
import getDefaultProductAttributes from '../../helpers/getDefaultProductAttributes';
import { connect } from 'react-redux';
import allActions from '../../actions';

class App extends Component {

  constructor(){
    super()

    this.addProductToCart = this.addProductToCart.bind(this);
    this.updateProductCartQuantity = this.updateProductCartQuantity.bind(this);
    this.eraseZeroQuantityCartElements = this.eraseZeroQuantityCartElements.bind(this);
  }

  eraseZeroQuantityCartElements(cartElements){

    const hasZeroQuantityCartElements = cartElements.find(cartEl => cartEl.quantity < 1);

    if (hasZeroQuantityCartElements) {

      const filteredCartElements = cartElements.filter(cartEl => cartEl.quantity > 0)

      this.setState({cartElements: filteredCartElements})
    }
  }

  updateProductCartQuantity = (product, quantity) => {

    const cartElements = this.props.cartElements;
    const productToUpdate = JSON.stringify(product);

    // Update quantity of particular product and delete if from cart if it's quantity is 0
    let updatedCartElements = cartElements.map(element => {

      if (JSON.stringify(element) === productToUpdate) {
        element.quantity = quantity;
      }

      return element;

    });

    this.props.setCartElements(updatedCartElements);
  }

  addProductToCart = async (productId, selectedAttributes) => {

    console.log(productId, selectedAttributes)

    debugger
    const product = await querySingleProduct(productId);

    const productAttributes = selectedAttributes ? selectedAttributes : await getDefaultProductAttributes(productId);

    if (this.props.cartElements.length > 0) {

      let isExistingProductQuantityUpdated = false;

      const updatedCartElements = [];

      this.props.cartElements.forEach(element => {
  
        // Check if that type of product exists in cart by comparing ID's
        if (element.product.id === product.id) {

          const newProductAttributesStates = JSON.stringify(productAttributes);
          const cartElementAttributesStates = JSON.stringify(element.selectedAttributes);
          
          // If product exists and has the same attributes, increment it's quantity
          if (newProductAttributesStates === cartElementAttributesStates) {
            
            element.quantity += 1;
            isExistingProductQuantityUpdated = true;
          }
          
        }

        updatedCartElements.push(element);
      })

      // If we don't update existing product order quantity, add new product to cart 
      if (!isExistingProductQuantityUpdated) {

        const orderedProduct = {
          product: product,
          selectedAttributes: productAttributes,
          quantity: 1,
          uuid: crypto.randomUUID(),
        };

        updatedCartElements.push(orderedProduct);
      }
      
      this.props.setCartElements(updatedCartElements);

    } else {

        const orderedProduct = {
          product: product,
          selectedAttributes: productAttributes,
          quantity: 1,
          uuid: crypto.randomUUID(),
        };
          
        this.props.setCartElements([...this.props.cartElements, orderedProduct]);
    }

  }

  componentDidMount(){
    this.eraseZeroQuantityCartElements(this.props.cartElements);
    saveToLocalStorage("state", {
      ...getFromLocalStorage("state") || 
      {
        isCartOverlayVisible: false,
        isCurrenciesListOpen: false,
        currentCurrencySymbol: "$",
        cartElements: [],
        selectedCategory: "all"
      }
    })
  }

  componentDidUpdate(){
    this.eraseZeroQuantityCartElements(this.props.cartElements);
    saveToLocalStorage("state", {
      ...getFromLocalStorage("state") || 
      {
        isCartOverlayVisible: false,
        isCurrenciesListOpen: false,
        currentCurrencySymbol: "$",
        cartElements: [],
        selectedCategory: "all"
      }
    })
  }

  render(){
    return (
      <div className="app">

        <Header/>

        <Main 
          updateProductCartQuantity={this.updateProductCartQuantity}
          addProductToCart={this.addProductToCart}
        />

      </div>
    )
  }
}

const mapDispatchToProps = {
  setCartElements: allActions.cartElementsActions.setCartElements,
}

const mapStateToProps = (state) => {
  
  const cartElements = state.rootReducer.cartElements;
  
  return {
      cartElements
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
