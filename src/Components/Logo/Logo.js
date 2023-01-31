import { PureComponent } from "react";
import './Logo.scss';

class Logo extends PureComponent {
    render() {
        return (
            <button className="logo-container">
                <img src="/assets/img/brand-icon.svg" alt="brand logo"/>
            </button>
        )
    }
}

export default Logo;