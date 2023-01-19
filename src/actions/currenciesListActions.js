
const openCurrencyPicker = () => {
    return {
        type: "OPEN_CURRENCY_PICKER"
    };
}

const closeCurrencyPicker = () => {
    return {
        type: "CLOSE_CURRENCY_PICKER"
    };
}

const toggleVisibility = () => {
    return {
        type: "TOGGLE_VISIBILITY"
    };
};

const currenciesListActions = {
    openCurrencyPicker,
    closeCurrencyPicker,
    toggleVisibility
}

export default currenciesListActions;
