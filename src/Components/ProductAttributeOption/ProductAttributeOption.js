import { PureComponent } from "react";
import "./ProductAttributeOption.scss";

class ProductAttributeOption extends PureComponent {

    constructor(props){
        super(props);
        this.changeActiveOption = this.props.changeActiveOption;
        this.attrSingleOption = this.props.attrSingleOption;
    }
    
    render(){
        
        const optionType = this.props.type === "swatch" ? 

            <button 
                className={`product-attribute-option ${this.props.size}`}
                onClick={(e) => this.changeActiveOption(e, this.attrSingleOption)}
                data-type="swatch"
                style={{
                    backgroundColor: this.attrSingleOption.value,
                    cursor: [this.props.areAttrsEditable ? "pointer" : "initial"]
                }}
                aria-pressed={this.props.isOptionPicked}
            />
            
            :

            <button 
                className={`product-attribute-option ${this.props.size}`}
                onClick={(e) => this.changeActiveOption(e, this.attrSingleOption)}
                data-type="text"
                aria-pressed={this.props.isOptionPicked}
                style={{
                    cursor: [this.props.areAttrsEditable ? "pointer" : "initial"]
                }}
            >
                <span className="product-attribute-option__name">{this.attrSingleOption.displayValue}</span>
            </button>

        return optionType;
    }
}

export default ProductAttributeOption;