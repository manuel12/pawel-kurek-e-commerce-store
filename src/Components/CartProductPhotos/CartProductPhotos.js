import { PureComponent } from "react";
import PhotoSwitcher from "../PhotoSwitcher/PhotoSwitcher";
import "./CartProductPhotos.scss";

class CartProductPhotos extends PureComponent {

    constructor(props){
        super(props)
        this.handleActivePhotoIndexDecrement = this.handleActivePhotoIndexDecrement.bind(this);
        this.handleActivePhotoIndexIncrement = this.handleActivePhotoIndexIncrement.bind(this);

        // Enable only if slider is needed
        this.isSliderVisible = this.props.isSliderVisible;

        this.state = {
            activePhotoIndex: 0,
        }
    }

    handleActivePhotoIndexIncrement(){
        if (this.state.activePhotoIndex < this.props.productPhotos.length - 1) {
            this.setState({activePhotoIndex: this.state.activePhotoIndex + 1})
        } else {
            this.setState({activePhotoIndex: 0})
        }
    }

    handleActivePhotoIndexDecrement(){
        if (this.state.activePhotoIndex > 0) {
            this.setState({activePhotoIndex: this.state.activePhotoIndex - 1})
        } else {
            this.setState({activePhotoIndex: this.props.productPhotos.length - 1})
        }
    }

    render(){
        const productPhotosArray = this.props.productPhotos.map((photo, index) => (
            <div className="cart-product-photos__photo-container">
                <img 
                    src={photo} 
                    alt="product" 
                    key={"cart-product-photo" + index}
                />
            </div>
        ))

        return (
            <div className={`cart-product-photos ${this.props.size}`}>
                <div className="cart-product-photos__active-photo">
                    {productPhotosArray[this.state.activePhotoIndex]}
                </div>
                {
                    (this.isSliderVisible && productPhotosArray.length > 1) &&
                    <PhotoSwitcher
                        handleActivePhotoIndexIncrement={this.handleActivePhotoIndexIncrement}
                        handleActivePhotoIndexDecrement={this.handleActivePhotoIndexDecrement}
                    />
                }
            </div>
        )
    }
}

export default CartProductPhotos;