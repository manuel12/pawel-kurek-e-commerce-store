import { Component } from "react";
import "./ProductPhotos.scss";

class ProductPhotos extends Component {

    constructor(props){
        super(props)
        this.state = {
            activePhotoGalleryIndex: 0
        }

        this.thumbnails = this.props.productPhotos.map(photo => (
            <button 
                id={this.props.productPhotos.indexOf(photo)}
                className="product-photos__single-thumbnail"
                onClick={this.handleActivePhotoChange.bind(this)}
            >
                <img src={photo} alt="product"/>
            </button>
        ))

    }
    
    handleActivePhotoChange(e){
        this.setState({activePhotoGalleryIndex: e.target.id})
    }

    render(){
        return (
            <div className="product-photos">
                <div className="product-photos__thumbnails">
                    {this.thumbnails}
                </div>
                <div 
                    className="product-photos__active-photo"
                >
                    <img src={this.props.productPhotos[this.state.activePhotoGalleryIndex]} alt="product"/>
                </div>
            </div>
        )
    }
}

export default ProductPhotos;