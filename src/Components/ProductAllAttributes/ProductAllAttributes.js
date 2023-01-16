import { Component } from "react";
import ProductAttribute from "../ProductAttribute/ProductAttribute";
import './ProductAllAttributes.scss';

class ProductAllAttributes extends Component {

    constructor(props){
        super(props);
        this.changeProductAttributesStates = this.props.changeProductAttributesStates;

        this.size = this.props.size ? this.props.size : "";
        
        // Set attrs to editable if it's not specified
        this.areAttrsEditable = this.props.areAttrsEditable;
    }

    render(){

        const productAttributes = this.props.attributes.map(attribute => {

            return (
                <ProductAttribute 
                    key={attribute.id}
                    attribute={attribute}
                    size={this.size}
                    productAttributesStates={this.props.productAttributesStates}
                    changeProductAttributesStates={this.changeProductAttributesStates}
                    areAttrsEditable={this.areAttrsEditable}
                />
            )
        })

        return (
            <div className={`product-all-attributes ${this.size}`}>
                {productAttributes}
            </div>
        )
    }
}

export default ProductAllAttributes;