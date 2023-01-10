import { Component } from "react";
import Actions from "../../Components/Actions/Actions";
import Logo from "../../Components/Logo/Logo";
import Navigation from "../../Components/Navigation/Navigation";
import './Header.scss';

class Header extends Component {
    render(){

        debugger
        
        return (
            <header className="header">         
                <Navigation/> 
                <Logo/>
                <Actions/>
            </header>
        )
    }
}   

export default Header;