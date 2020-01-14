import React, { useReducer, useCallback } from "react"
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button } from "react-native"
import { useDispatch } from "react-redux"
import { LinearGradient } from "expo-linear-gradient"
import Input from "../../components/UI/Input"
import Card from "../../components/UI/Card"
import * as authActions from "../../store/actions/auth"

import Colors from "../../constants/Colors"
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE"

const formReducer = (state, action) => {

    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        }
    }
    return state

}


const AuthScreen = props => {

    //get access to dispatch function
    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''

        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    })

    const signupHandler = () => {
        console.log('password', formState.inputValues)
        if (!formState.formIsValid) {
            return
        }

        dispatch(authActions.signup(
            formState.inputValues.email,
            formState.inputValues.password
        ))
    }

    const inputChangeHandler =
        useCallback((
            inputIdentifier,
            inputValue,
            inputValidity) => {
            console.log(inputIdentifier, inputValue, inputValidity)

            dispatchFormState(
                {
                    type: FORM_INPUT_UPDATE,
                    value: inputValue,
                    isValid: inputValidity,
                    input: inputIdentifier
                })
        }, [dispatchFormState])

    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}>
            <LinearGradient
                colors={['#ffedff', '#ffe3ff']}
                style={styles.gradient}>
                <Card style={styles.authContainer}>
                    {/* keyboardShouldPersistTaps determines when the keyboard should stay visible after a tap.*/}
                    <ScrollView keyboardShouldPersistTaps="never">
                        <Input
                            autoCapitalize="none"
                            email
                            errorText="Please enter a valid email address"
                            id="email"
                            initialValue=""
                            label="Email"
                            keyboardType="email-address"
                            required
                            onInputChange={inputChangeHandler} />
                        <Input
                            autoCapitalize="none"
                            errorText="Please enter a valid password"
                            id="password"
                            initialValue=""
                            label="Password"
                            keyboardType="default"

                            required
                            minLength={5}
                            onInputChange={inputChangeHandler} />
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Login"
                            color={Colors.primary}
                            onPress={signupHandler} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Switch to Signup"
                            color={Colors.accent}
                            onPress={() => { }} />
                    </View>

                </Card>
            </LinearGradient>
        </KeyboardAvoidingView >
    )
}

AuthScreen.navigationOptions = {
    headerTitle: "Authenticate"
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
})

export default AuthScreen