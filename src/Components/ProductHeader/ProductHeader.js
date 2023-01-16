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
                <h1>{this.props.name}</h1>
                <h2>{this.props.name}</h2>
            </header>
        )
    }
}

export default ProductHeader;