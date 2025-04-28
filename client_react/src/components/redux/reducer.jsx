const inintialState = {
    users: [],
    currUser: {},
    token: "",
    refreshUsers: false,
    categories: [],
    products: [],
    orders: [],
    addCategory: {},
    updateCategory: {},
    cart: [],
    cartTotal: 0,
    sendOrder: false
};

const reducer = (state = inintialState, action) => {
    switch(action.type)
    {
        case "GET_USERS":
            state = {...state, users: [...action.payload]}
            return state
        case "GET_CATEGORIES":
            state = {...state, categories: [...action.payload]}
            return state
        case "GET_PRODUCTS":
            state = {...state, products: [...action.payload]}
            return state
        case "GET_ORDERS":
            state = {...state, orders: [...action.payload]}
            return state
        case "GET_TOKEN":
            state = {...state, token: action.payload}
            return state
        case "GET_CURRUSER":
            state = {...state, currUser: {...action.payload}}
            return state
        case "REFRESH_USERS":
            state = {...state, refreshUsers: action.payload}
            return state
        case "ADD_CATEGORY":
            state = {...state, addCategory: action.payload}
            return state
        case "UPDATE_CART":
            state = {...state, cart: [...action.payload]}
            return state
        case "UPDATE_CARTTOTAL":
            state = {...state, cartTotal: action.payload}
            return state
        case "SEND_ORDER":
            state = {...state, sendOrder: action.payload}
            return state
        default:
            // console.log("Invalid action, state remains the same!")
            return state
    }
}

export default reducer;