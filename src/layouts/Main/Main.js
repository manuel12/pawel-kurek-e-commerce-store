import { PureComponent } from "react";
import { connect } from "react-redux";
import {Route, Routes, Navigate } from "react-router-dom";
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

class Main extends PureComponent {

    constructor(props){
        super(props)
        this.addProductToCart = this.addProductToCart.bind(this);
        this.changeAttrValue = this.changeAttrValue.bind(this);
        this.updateProductCartQuantity = this.updateProductCartQuantity.bind(this);
        this.getTotalCartCost = this.getTotalCartCost.bind(this);

        this.state = {
            productId: "",
            cartProductsAttributesStates: []
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

    updateProductCartQuantity = (cartProduct, quantity) => {

        const productToUpdate = JSON.stringify(cartProduct);
        const cartElementsCopy = copyObject(this.props.cartElements);
    
        // Update quantity of particular product and delete if from cart if it's quantity is 0
        let updatedCartElements = []

        cartElementsCopy.forEach(cartEl => {
        
          if (JSON.stringify(cartEl) === productToUpdate) {
            cartEl.quantity = quantity;

            if (cartEl.quantity > 0) {
                updatedCartElements.push(cartEl)
            }

          } else {
            updatedCartElements.push(cartEl)
          }
    
        });

        console.log(updatedCartElements);
        this.props.setCartElements(updatedCartElements);
    }
    
    changeAttrValue = (selectedOptionAttrId, selectedOptionParams) => {
        
        // Continue if any attribute is set
        if (this.state.cartProductsAttributesStates.length > 0) {

            // Check if any of attributes has changed it's value and save it if so
            const newAttributesStates = this.state.cartProductsAttributesStates.map(attribute => {
    
                if (attribute.attrId === selectedOptionAttrId) {
                    return {
                        attrId: selectedOptionAttrId,
                        attrValue: selectedOptionParams.value
                    }
                } else {
                    return attribute
                }
            })
    
            this.setState({cartProductsAttributesStates: newAttributesStates})

        } else {

            this.setState({cartProductsAttributesStates: [
                {
                    attrId: selectedOptionAttrId,
                    attrValue: selectedOptionParams.value
                }
            ]})
        }

    }

    getTotalCartCost = () => {

        const totalCartCost = this.props.cartElements.map(cartEl => {

            const unitCost = cartEl.product.prices.find(price => price.currency.symbol === this.props.currentCurrencySymbol).amount;

            const productQuantity = cartEl.quantity;

            return unitCost * productQuantity;

        }).reduce((acc, currentVal) => acc + currentVal, 0).toFixed(2);

        return totalCartCost;
    }

    render(){
        return (
            <main>

                {this.props.isCartOverlayVisible &&
                    <CartOverlay 
                        updateProductCartQuantity={this.updateProductCartQuantity}
                        changeAttrValue={this.changeAttrValue}
                        totalCartCost={this.getTotalCartCost()}
                    />
                }

                <Routes>
                    <Route
                        path={"*"}
                        element={<ErrorBoundary/>}
                    />

                    <Route 
                        path="/" 
                        element={<Navigate to="/all"/>} 
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
                                updateProductCartQuantity={this.updateProductCartQuantity}
                                totalCartCost={this.getTotalCartCost()}
                            />
                        }
                    />
                </Routes>

                    
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

