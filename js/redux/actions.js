export {
    INCREMENT, DECREMENT, ADD_PRODUCT, CHANGE_ORDER,
    increment, decrement, addProduct, changeOrder,
    STEP
};

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const STEP = 1;
const ADD_PRODUCT = "ADD_PRODUCT";
const CHANGE_ORDER = "CHANGE_ORDER";

function increment(value) {
    return({
        type: INCREMENT,
        payload: value
    });
}

function decrement(value) {
    return({
        type: DECREMENT,
        payload: value
    });
}

function addProduct(product) {
    return({
        type: ADD_PRODUCT,
        payload: product
    });
}

function changeOrder(direction, index) {
    return({
        type: CHANGE_ORDER,
        payload: {
            direction,
            index
        }
    });
}

// done
