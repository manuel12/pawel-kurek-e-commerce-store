import { PureComponent } from "react";
import "./Price.scss";

class Price extends PureComponent {
    render(){
        return (
            <div className={`price ${this.props.size}`}>
                {this.props.size === "small" ? null : <h3>PRICE:</h3>}
                <span>{this.props.symbol}{this.props.amount}</span>
            </div>
        )
    }
}

export default Price;