import { Component } from "react";
import "./ProductHeader.scss";

class ProductHeader extends Component {
    
    constructor(props){
        super(props)
        this.size = this.props.size;
    }

    render(){
        return (
            <header 
                className={`product-header ${this.size}`}
                >
                <h2>{this.props.brand}</h2>
                <h1>{this.props.name}</h1>
            </header>
        )
    }
}

export default ProductHeader;