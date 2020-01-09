export const ADD_ORDER = "ADD_ORDER"

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {

        const date = new Date().toISOString()
        //any async code you want!
        const response = await fetch('https://reactnative-shop-app.firebaseio.com/orders/u1.json', {
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