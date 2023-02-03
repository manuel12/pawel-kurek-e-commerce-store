import { Query } from "@apollo/client/react/components";
import { PureComponent } from "react";
import {NavLink } from "react-router-dom";
import getCurrentRoute from "../../helpers/getCurrentRoute";
import queryCategories from "../../queries/queryCategories";
import './Navigation.scss';

class Navigation extends PureComponent {

    render() {
        return (
            <Query query={queryCategories()}>
                {({loading, data}) => {
        
                    if (loading) return "Loading...";
        
                    const {categories} = data;
        
                    const categoriesNavList = categories.map(category => {
                        
                        const {name} = category;

                        let isSelected = false;

                        if (name === getCurrentRoute()) isSelected = true;
        
                        return (
                            <NavLink
                                key={name} 
                                to={name}
                                className="categories-list__category"
                                role="tab"
                                aria-selected={isSelected}
                                // onClick={() => setCurrentRoute(name)}
                            >
                                {name}
                            </NavLink>
                        )
                    })
        
                    return (
                        <nav role="tablist" className="categories-list">
                                {categoriesNavList}
                        </nav>
                    )
                }}
            </Query>
        )
    }
}

export default Navigation;