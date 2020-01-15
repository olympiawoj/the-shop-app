export const SIGNUP = "SIGNUP"
export const LOGIN = "LOGIN"


//to create a new user, we need an email and password
export const signup = (email, password) => {
    //send HTTP request using redux thunk to return a function async dispatch which can use async/await which gets dispatch function as an arg passed in by redux thunk middleware, allows us to run async code before we then dispatch an action that creates our store
    return async dispatch => {
        //send HTTP request using fetch() API to the URL in Firebase
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDF3Z2NVuOFyVKyXsNXM1M1tPFJItu5P4g", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!response.ok) {
            console.log('response not ok')
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Something went wrong!'
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email already exists already'
            }
            throw new Error(message)
        }
        //if response is okay, get resData by awaiting for response.jsON which will unpack and convert from JSON to JS
        const resData = await response.json()
        console.log('resData', resData)

        //dispatch action object with type and data]
        dispatch({
            type: SIGNUP
        })
    }
}


//to create a new user, we need an email and password
export const login = (email, password) => {
    //send HTTP request using redux thunk to return a function async dispatch which can use async/await which gets dispatch function as an arg passed in by redux thunk middleware, allows us to run async code before we then dispatch an action that creates our store
    return async dispatch => {
        //send HTTP request using fetch() API to the URL in Firebase
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDF3Z2NVuOFyVKyXsNXM1M1tPFJItu5P4g", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Something went wrong!'
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found'
            } else if (errorId === "INVALID_PASSWORD") {
                message = 'This password is not valid'
            }
            throw new Error(message)
        }
        //if response is okay, get resData by awaiting for response.jsON which will unpack and convert from JSON to JS
        const resData = await response.json()
        console.log('resData', resData)

        //dispatch action object with type and data]
        dispatch({
            type: LOGIN
        })
    }
}