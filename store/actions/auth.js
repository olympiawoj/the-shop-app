export const SIGNUP = "SIGNUP"


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
            throw new Error("Something went wrong when signing up")
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