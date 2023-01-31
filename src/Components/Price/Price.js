import { PureComponent } from "react";
import "./Price.scss";

class Price extends PureComponent {

    constructor(props){
        super(props)
        this.size = this.props.size;
    }
    
    render(){

        return (
            <div className={`price ${this.size}`}>
                {this.size === "small" ? null : <h3>PRICE:</h3>}
                <span>{this.props.symbol}{this.props.amount}</span>
            </div>
        )
    }
}

export default Price;