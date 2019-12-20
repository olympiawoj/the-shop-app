import { ADD_TO_CART } from "../actions/cart"
import CartItem from "../../models/cart-item"

const initialState = {
    items: {},
    totalAmount: 0
};



export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title

            let updatedOrNewCartItem;

            //is this product already part of items?
            if (state.items[addedProduct.id]) {
                //already have item in the cart so change quantity
                updatedOrNewCartItem = new CartItem(
                    //prepopulate w existing data
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    //total sum for cardItem, it's current sum + price
                    state.items[addedProduct.id].sum + prodPrice
                )
            } else {
                //add brand new item
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
                //add newCartItem to cartItems

            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            }


        default:
            return state
    }

}

