import React, { PureComponent } from "react";
import { connect } from "react-redux";
import allActions from "../../actions";
import MiniCartElement from "../MiniCartElement/MiniCartElement";
import MiniCartTotalCost from "../MiniCortTotalCost/MiniCartTotalCost";
import './MiniCart.scss';

class MiniCart extends PureComponent {

    constructor(props){
        super(props)
        this.updateProductCartQuantity = this.props.updateProductCartQuantity;
    }
    
    render(){

        const itemsCount = 
            this.props.cartElements.length > 1 ? 
            this.props.cartElements.length + " items" :
            this.props.cartElements.length + " item"
        
        return(
            <div className="mini-cart">

                <header className="mini-cart__header">
                    <span><strong>My Bag</strong>, {itemsCount}</span>
                </header>
                
                {
                    this.props.cartElements.map((cartElement, index) => {

                        return (
                            <React.Fragment key={"mini__cart__element" + index}>
                                <MiniCartElement
                                    updateProductCartQuantity={this.updateProductCartQuantity}
                                    cartElement={cartElement}
                                />
                            </React.Fragment>
                        )
                    })
                }

                <MiniCartTotalCost
                    totalCartCost={this.props.totalCartCost}
                />

                <div className="mini-cart__links-container">
                    <a 
                        href="/cart"
                        className="mini-cart__cart-link"
                        onClick={this.props.toggleCartOverlay}
                    >
                        VIEW BAG
                    </a>
                    <a 
                        href="/"
                        className="mini-cart__check-out-link"
                        onClick={this.props.toggleCartOverlay}
                    >
                        CHECK OUT
                    </a>
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = {
    toggleCartOverlay: allActions.cartOverlayActions.toggleCartOverlay,
  }
  
  const mapStateToProps = (state) => {
    
    const isCartOverlayVisible = state.rootReducer.cartOverlay;
    const currentCurrencySymbol = state.rootReducer.currentCurrencySymbol;
    const cartElements = state.rootReducer.cartElements;
    
    return {
        isCartOverlayVisible,
        currentCurrencySymbol,
        cartElements
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
