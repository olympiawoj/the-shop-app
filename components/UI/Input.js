import React, { useReducer, useEffect } from "react"

import { View, Text, TextInput, StyleSheet } from "react-native"

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state
    }

}
const Input = props => {
    const { label, errorText, initialValue, initiallyValid, onInputChange, id } = props

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue ? initialValue : '',
        isValid: initiallyValid ? initiallyValid : '',
        touched: false
    })

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid)
        }
    }, [id, onInputChange, inputState])

    const textChangeHandler = text => {

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }

        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
    }

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR })
    }

    return (
        <View style={styles.formControl}>
            <Text style={styles.label} >{label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onBlur={lostFocusHandler}
                onChangeText={textChangeHandler}

            // onEndEditing={() => console.log('onEndEditing')}
            // onSubmitEditing={() => console.log('onSubmitEditing')}
            />
            <View style={styles.errorContainer}>
                {!inputState.isValid && inputState.touched && <Text style={styles.errorText}>{errorText}</Text>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontFamily: "open-sans",
        color: 'red',
        fontSize: 14
    }
})
export default Input