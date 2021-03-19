import { combineReducers } from "redux";
import {INCREMENT, DECREMENT, ADD_PRODUCT, CHANGE_ORDER} from "./actions";

function counter(state = 0, {type, payload}) {
    switch (type) {
        case INCREMENT:
            return state + payload;
        case DECREMENT:
            return state - payload;
        default:
            return state;
    }
}

function products(state = [], {type, payload}) {
    switch (type) {
        case ADD_PRODUCT:
            return [...state, payload];
        case CHANGE_ORDER:
            return moveProduct(state, payload.index, payload.direction);
        default:
            return state;
    }
}

function changeValuePosition (arr, init, target) {
    [arr[init], arr[target]] = [arr[target], arr[init]]; 
    return arr;
}

function moveProduct(state, index, direction) {
    if(direction === "up" && +index) {
        return changeValuePosition([...state], +index, +index - 1)
    } else
    if(direction === "down" && +index < state.length - 1) {
        return changeValuePosition([...state], +index, +index + 1)
    }
    return state;
}

export default combineReducers({
    counter: counter,
    products: products
});

// done
