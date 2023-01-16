import { Component } from "react";
import "./ProductPage.scss";
import ProductDetails from "../ProductDetails/ProductDetails";
import ProductPhotos from "../ProductPhotos/ProductPhotos";
import querySingleProduct from "../../queries/querySingleProduct";

class ProductPage extends Component {

    constructor(props){
        super(props)
        this.addProductToCart = this.props.addProductToCart;
        this.productId = this.props.productId;
        this.state = {
            productDetails: null
        }
    }

    async componentDidMount(){
        this.setState({productDetails: await querySingleProduct(this.productId)});
    }

    render(){

        const {productDetails} = this.state;

        return (
            <section className="product-page">
                {
                    productDetails && 
                    <>
                        <ProductPhotos productPhotos={productDetails.gallery}/>
                        <ProductDetails 
                            productDetails={productDetails}
                            addProductToCart={this.addProductToCart}
                        />
                    </>
                }
                
            </section>
        )
    }
}

export default ProductPage;