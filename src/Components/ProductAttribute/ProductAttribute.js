import { PureComponent } from "react";
import ProductAttributeOption from "../ProductAttributeOption/ProductAttributeOption";
import "./ProductAttribute.scss";

class ProductAttribute extends PureComponent {

    constructor(props){
        super(props)
        this.changeProductAttributesStates = this.props.changeProductAttributesStates;
        this.changeActiveOption = this.changeActiveOption.bind(this);
        this.isOptionPicked = this.isOptionPicked.bind(this);
    }

    isOptionPicked(attrId, attrOption, productSelectedAttributes){

        const attribute = productSelectedAttributes.find(attr => attr.attrId === attrId)

        if (attribute) {
            return attribute.optionParams.id === attrOption.id
        } else {
            return false;
        }
    }

    changeActiveOption(e, attrOptionParams){
        
        // Reset all size buttons to default not pressed state
        const allAttrOptions = [...e.target.parentNode.children];
        
        allAttrOptions.forEach(option => {
            option.setAttribute("aria-pressed", false);
        });
        
        // Set clicked button as a choosed attr option
        const chosenOption = e.target;
        
        chosenOption.setAttribute("aria-pressed", true);

        // Change attr value based on selected attr option
        this.changeProductAttributesStates(this.props.attribute.id, attrOptionParams)
    }

    render(){

        const allAttrOptions = this.props.attribute.items.map(attrSingleOption => {

            return (
                <ProductAttributeOption
                    key={this.props.id + attrSingleOption.value}
                    type={this.props.type}
                    size={this.props.size}
                    attrSingleOption={attrSingleOption}
                    areAttrsEditable={this.props.areAttrsEditable}
                    changeActiveOption={this.props.areAttrsEditable ? this.changeActiveOption : function(){}}
                    productAttributesStates={this.props.productAttributesStates}
                    isOptionPicked={this.isOptionPicked(this.props.attribute.id, attrSingleOption, this.props.productAttributesStates)}
                />
            )
        })

        return(
            <section className={`product-attribute ${this.props.size}`}>
                <h3>{this.props.attribute.name}:</h3>
                <div className="product-attribute__all-options">
                    {allAttrOptions}
                </div>
            </section>
            
        )
    }
}

export default ProductAttribute;