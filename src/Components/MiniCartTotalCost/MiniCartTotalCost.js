import { PureComponent } from "react";
import { connect } from "react-redux";
import './MiniCartTotalCost.scss';

class MiniCartTotalCost extends PureComponent {

    render(){
        return(
            <div className="mini-cart-total-cost">
                <div>Total</div>
                <div>
                    <span className="mini-cart-total-cost__currency-symbol">
                        {this.props.currentCurrencySymbol}
                    </span>
                    <span className="mini-cart-total-cost__amount">
                        {this.props.totalCartCost}
                    </span>
                </div>
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
  
export default connect(mapStateToProps, null)(MiniCartTotalCost);