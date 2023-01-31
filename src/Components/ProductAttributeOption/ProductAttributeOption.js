import { PureComponent } from "react";
import "./ProductAttributeOption.scss";

class ProductAttributeOption extends PureComponent {

    constructor(props){
        super(props);
        this.changeActiveOption = this.props.changeActiveOption;
        this.attrSingleOption = this.props.attrSingleOption;

        this.size = this.props.size
    }
    
    render(){
        
        const optionType = this.props.type === "swatch" ? 

            <button 
                className={`product-attribute-option ${this.size}`}
                onClick={(e) => this.changeActiveOption(e, this.attrSingleOption)}
                data-type="swatch"
                style={{backgroundColor: this.attrSingleOption.value}}
                aria-pressed={this.props.isOptionPicked}
            />
            
            :

            <button 
                className={`product-attribute-option ${this.size}`}
                onClick={(e) => this.changeActiveOption(e, this.attrSingleOption)}
                data-type="text"
                aria-pressed={this.props.isOptionPicked}
            >
                <span className="product-attribute-option__name">{this.attrSingleOption.displayValue}</span>
            </button>

        return optionType;
    }
}

export default ProductAttributeOption;