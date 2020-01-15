export const ADD_ORDER = "ADD_ORDER"
export const SET_ORDER = "SET_ORDER"
import Order from "../../models/orders"

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://reactnative-shop-app.firebaseio.com/orders/u1.json')

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const resData = await response.json()
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
            console.log(resData)
            dispatch({ type: SET_ORDER, orders: loadedOrders })
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
        const date = new Date().toISOString()
        //any async code you want!
        const response = await fetch(`https://reactnative-shop-app.firebaseio.com/orders/u1.json?${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                //convert to string save locally in App and save on server
                date: date
            })
        })
        //get back res data which includes auto generated id 
        const resData = await response.json()
        console.log(resData)

        dispatch({
            type: ADD_ORDER,
            orderData: { id: resData.name, date: date, items: cartItems, amount: totalAmount }
        })

        if (!response.ok) {
            throw new Error("Something went wrong adding an order")
        }


    }
}