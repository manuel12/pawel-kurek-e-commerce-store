import { Component } from "react";
import { connect } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider } from "react-router-dom";
import allActions from "../../actions";
import Cart from "../../Components/Cart/Cart";
import CartOverlay from "../../Components/CartOverlay/CartOverlay";
import CategoryProducts from "../../Components/CategoryProducts/CategoryProducts";
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";
import ProductPage from "../../Components/ProductPage/ProductPage";
import { copyObject } from "../../helpers/copyObject";
import getDefaultProductAttributes from "../../helpers/getDefaultProductAttributes";
import querySingleProduct from "../../queries/querySingleProduct";
import "./Main.scss";

class Main extends Component {

    constructor(props){
        super(props)
        this.addProductToCart = this.addProductToCart.bind(this);
        this.changeAttrValue = this.changeAttrValue.bind(this);

        this.state = {
            productId: "",
            cartProdcutsAttributesStates: []
        }
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
    
    changeAttrValue(selectedOptionAttrId, selectedOptionParams){
        
        // Continue if any attribute is set
        if (this.state.cartProdcutsAttributesStates.length > 0) {

            // Check if any of attributes has changed it's value and save it if so
            const newAttributesStates = this.state.cartProdcutsAttributesStates.map(attribute => {
    
                if (attribute.attrId === selectedOptionAttrId) {
                    return {
                        attrId: selectedOptionAttrId,
                        attrValue: selectedOptionParams.value
                    }
                } else {
                    return attribute
                }
            })
    
            this.setState({cartProdcutsAttributesStates: newAttributesStates})

        } else {

            this.setState({cartProdcutsAttributesStates: [
                {
                    attrId: selectedOptionAttrId,
                    attrValue: selectedOptionParams.value
                }
            ]})
        }

    }

    render(){

        const totalCartCost = this.props.cartElements.map(cartEl => {

            const unitCost = cartEl.product.prices.find(price => price.currency.symbol === this.props.currentCurrencySymbol).amount;

            const productQuantity = cartEl.quantity;

            return unitCost * productQuantity;

        }).reduce((acc, currentVal) => acc + currentVal, 0).toFixed(2);

        return (
            <main>

                {this.props.isCartOverlayVisible && 
                    <CartOverlay 
                        updateProductCartQuantity={this.updateProductCartQuantity}
                        changeAttrValue={this.changeAttrValue}
                        totalCartCost={totalCartCost}
                    />
                }

                <RouterProvider router={
                    createBrowserRouter(
                        createRoutesFromElements(
                            <>
                                <Route
                                    path={"/"}
                                    loader={() => {
                                        throw redirect("/all");
                                    }}
                                    errorElement={<ErrorBoundary/>}
                                />
                                <Route
                                    path={`/all`}
                                    element={
                                        <CategoryProducts 
                                            currentCategory="all"
                                            addProductToCart={this.addProductToCart}
                                        />
                                    }
                                />
                                
                                <Route
                                    path={`/clothes`}
                                    element={
                                        <CategoryProducts 
                                            currentCategory="clothes"
                                            addProductToCart={this.addProductToCart}
                                        />
                                    }
                                />

                                <Route
                                    path={`/tech`}
                                    element={
                                        <CategoryProducts 
                                            currentCategory="tech"
                                            addProductToCart={this.addProductToCart}
                                        />
                                    }
                                />

                                <Route
                                    path={`/product/:productId`}
                                    element={
                                        <ProductPage 
                                            productId={window.location.pathname.slice(9)}
                                            addProductToCart={this.addProductToCart}
                                        />
                                    }
                                />

                                <Route
                                    path={`/cart`}
                                    element={
                                        <Cart
                                            totalCartCost={totalCartCost}
                                        />
                                    }
                                />
                            </>
                        )
                    )
                }/>
                    
            </main>
        )
    }
}   

const mapDispatchToProps = {
    setCartElements: allActions.cartElementsActions.setCartElements,
  }
  
  const mapStateToProps = (state) => {
    
    const cartElements = state.rootReducer.cartElements;
    const isCartOverlayVisible = state.rootReducer.cartOverlay;
    const currentCurrencySymbol = state.rootReducer.currentCurrencySymbol
    
    return {
        cartElements,
        isCartOverlayVisible,
        currentCurrencySymbol
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);

