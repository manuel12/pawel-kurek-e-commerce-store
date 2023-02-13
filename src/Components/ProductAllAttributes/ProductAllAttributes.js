import { PureComponent } from "react";
import ProductAttribute from "../ProductAttribute/ProductAttribute";
import './ProductAllAttributes.scss';

class ProductAllAttributes extends PureComponent {

    constructor(props){
        super(props);
        this.changeProductAttributesStates = this.props.changeProductAttributesStates;
        
        // Set attrs to editable if it's not specified
        this.areAttrsEditable = this.props.areAttrsEditable;
    }

    render(){

        const productAttributes = this.props.attributes.map(attribute => {

            return (
                <ProductAttribute 
                    key={attribute.id}
                    attribute={attribute}
                    size={this.props.size}
                    type={attribute.type}
                    productAttributesStates={this.props.productAttributesStates}
                    changeProductAttributesStates={this.changeProductAttributesStates}
                    areAttrsEditable={this.areAttrsEditable}
                />
            )
        })

        return (
            <div className={`product-all-attributes ${this.props.size}`}>
                {productAttributes}
            </div>
        )
    }
}

export default ProductAllAttributes;