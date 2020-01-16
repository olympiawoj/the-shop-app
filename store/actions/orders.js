export const ADD_ORDER = "ADD_ORDER"
export const SET_ORDERS = "SET_ORDERS"
import Order from "../../models/orders"

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        console.log('user id', userId)
        try {
            const response = await fetch(`https://reactnative-shop-app.firebaseio.com/orders/${userId}.json`)

            if (!response.ok) {
                throw new Error('Something went wrong fetching orders!')
            }

            const resData = await response.json()
            console.log('fetchOrders', resData)
            const loadedOrders = []

            for (const key in resData) {
                //the id is the key, r
                loadedOrders.push(new Order(
                    key,
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    //bc the date is a string, create a new date object
                    new Date(resData[key].date)
                ))
            }
            // console.log(resData)
            dispatch({ type: SET_ORDERS, orders: loadedOrders })
        }
        catch (error) {
            //handle error - send to custom analytics server etc
            throw error
        }
    }

}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        const date = new Date()
        //any async code you want!
        const response = await fetch(`https://reactnative-shop-app.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                //convert to string save locally in App and save on server
                date: date.toISOString()
            })
        })
        // console.log('this is the response', response)

        if (!response.ok) {
            throw new Error("Something went wrong adding an order")
        }

        //get back res data which includes auto generated id 
        const resData = await response.json()
        console.log('add order resData', resData)

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems, amount: totalAmount,
                date: date,
            }
        })



    }
}