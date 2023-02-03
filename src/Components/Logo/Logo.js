import { PureComponent } from "react";
import {Link } from "react-router-dom";
import './Logo.scss';

class Logo extends PureComponent {
    render() {
        return (
                <Link to={"/all"}>
                    <button className="logo-container">
                        <img src="/assets/img/brand-icon.svg" alt="brand logo"/>
                    </button>
                </Link>
        )
    }
}

export default Logo;