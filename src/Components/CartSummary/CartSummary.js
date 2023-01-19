import { Component } from "react";
import { connect } from "react-redux";
import "./CartSummary.scss";

class CartSummary extends Component {
    
    render(){
        const tax = (this.props.totalCartCost * 0.21).toFixed(2);
        const itemsQuantity = this.props.cartElements.map(cartEl => cartEl.quantity).reduce((acc, cur) => acc + cur, 0)

        return(
            <div className="cart-total-cost">
                <table>
                    <thead></thead>

                    <tbody>

                        <tr>
                            <td className="cart-total-cost__prop-header">
                                Tax 21%:
                            </td>
                            <td className="cart-total-cost__prop-value">
                                <span>{this.props.currentCurrencySymbol}{tax}</span>
                            </td>
                        </tr>

                        <tr>
                            <td className="cart-total-cost__prop-header">
                                Quantity:
                            </td>
                            <td className="cart-total-cost__prop-value">
                                <span>{itemsQuantity}</span>
                            </td>
                        </tr>

                        <tr>
                            <td className="cart-total-cost__prop-header">
                                Total:
                            </td>
                            <td className="cart-total-cost__prop-value">
                                <span className="cart-total-cost__currency-symbol">
                                    {this.props.currentCurrencySymbol}
                                </span>
                                <span className="cart-total-cost__amount">
                                    {this.props.totalCartCost}
                                </span>
                            </td>
                        </tr>

                    </tbody>

                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    const currentCurrencySymbol = state.rootReducer.currentCurrencySymbol;
    const cartElements = state.rootReducer.cartElements;

    return {
        currentCurrencySymbol,
        cartElements
    }
}

export default connect(mapStateToProps, null)(CartSummary);