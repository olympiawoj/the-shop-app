import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart"
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
        case REMOVE_FROM_CART: {

            const selectedCartItem = state.items[action.pid]
            const currentQty = selectedCartItem.quantity //state.items is an object and this dynamically access item with product id key in our items
            let updatedCartItems;
            if (currentQty > 1) {
                //  two or more items, reduce qty not erase it
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice)
                //old cart item with updated sum and qty
                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
            } else {
                //we only have 1 item and need to remove entirely from cartItems object
                //return new items object which includes all old items removing this one
                updatedCartItems = { ...state.items }
                delete updatedCartItems[action.pid]

            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }

        }

        default:
            return state
    }

}

