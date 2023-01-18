import { Component } from "react";
import { Query } from "@apollo/client/react/components";
import {BiChevronDown as CurrencyPickerDash} from 'react-icons/bi';
import "./CurrencyPicker.scss";
import queryCurrencies from "../../queries/queryCurrencies";
import { connect } from "react-redux";
import allActions from "../../actions";

class CurrencyPicker extends Component {

    constructor(){
        super()
        this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    }
    
    handleCurrencyClick = (symbol) => {
        this.props.setCurrency(symbol)
        this.props.toggleCurrenciesListVisibility();
    }

    render() {

        return (
            <div className="currency-picker">

                <div className="show-currencies-container">

                    <label htmlFor="show-currencies">{this.props.currentCurrencySymbol}</label>
                    <button 
                        onClick={this.props.toggleCurrenciesListVisibility}
                        id="show-currencies"
                        className={`show-currencies ${this.props.isCurrenciesListOpen ? "dash-open" : ""} `}
                    >
                        <CurrencyPickerDash/>
                    </button>

                </div>
                
                {
                    this.props.isCurrenciesListOpen &&
                    <Query query={queryCurrencies()}>
                        {({loading, data}) => {
                
                            if (loading) return "Loading...";
                
                            const {currencies} = data;
                
                            const currencyList = currencies.map(currency => {
                                const {label, symbol} = currency;

                                return (
                                    
                                    <button
                                        key={label} 
                                        className="currency-option"
                                        onClick={() => this.handleCurrencyClick(symbol)}
                                    >
                                        <span className="currency-symbol">{symbol}</span>
                                        <span className="currency-label">{label}</span>
                                    </button>
                                )
                            })
                
                            return (
                                <div 
                                    className={`currencies-options-container ${this.props.isCurrenciesListOpen ? "currencies-options-container-visible" : ""} `}
                                >
                                    {currencyList}
                                </div> 
                            )
                        }}
                    </Query>
                }

            </div>
        )
        
    }
}

const mapDispatchToProps = {
    toggleCurrenciesListVisibility: allActions.currenciesListActions.toggleVisibility,
    setCurrency: allActions.currentCurrencySymbolActions.setCurrency,
}

const mapStateToProps = (state) => {
    
    const isCurrenciesListOpen = state.rootReducer.currenciesList;
    const currentCurrencySymbol = state.rootReducer.currentCurrencySymbol;
    
    return {
        isCurrenciesListOpen,
        currentCurrencySymbol
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPicker);