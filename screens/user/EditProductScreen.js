import React, { useState, useEffect, useCallback, useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as productsActions from "../../store/actions/products"
import { View, Text, TextInput, ScrollView, StyleSheet, Platform, Alert } from "react-native"
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

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

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))
    // console.log('edited product', editedProduct)

    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : "")
    // const [titleIsValid, setTitleIsValid] = useState(false)
    // const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : "")
    // const [price, setPrice] = useState('')
    // const [description, setDescription] = useState(editedProduct ? editedProduct.description : "")

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : "",
            imageUrl: editedProduct ? editedProduct.imageUrl : "",
            description: editedProduct ? editedProduct.description : "",
            price: ''

        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    })


    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong Input', 'Please check the errors in the form', [{ text: 'Okay' }])
            return
        }

        if (editedProduct) {
            // console.log('title', title)
            dispatch(productsActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl))
        } else {
            dispatch(productsActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price))
        }
        props.navigation.goBack()
    }, [dispatch, prodId, formState])


    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false
        if (text.trim().length > 0) {
            isValid = true

        }

        console.log('is valid', isValid)
        dispatchFormState(
            {
                type: FORM_INPUT_UPDATE,
                value: text,
                isValid: isValid,
                input: inputIdentifier
            })

    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label} >Title</Text>
                    <TextInput
                        autoCapitalize="sentences"
                        autoCorrect
                        keyboardType="default"
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        returnKeyType="next"
                        onEndEditing={() => console.log('onEndEditing')}
                        onSubmitEditing={() => console.log('onSubmitEditing')}
                    />
                    {!formState.inputValidities.title && <Text>Please enter a valid title</Text>}
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.label} >Image URL</Text>
                    <TextInput

                        style={styles.input}
                        value={formState.inputValues.imageUrl}
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')} />
                </View>

                {editedProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label} >Price</Text>
                    <TextInput keyboardType="decimal-pad" style={styles.input} value={formState.inputValues.price} onChangeText={textChangeHandler.bind(this, "price")} />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={formState.inputValues.description} onChangeText={textChangeHandler.bind(this, "description")} />
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? "Edit Product" : "Add Product",
        headerRight:
            <HeaderButtons
                HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={Platform.OS === "android" ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFn} />
            </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
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
    }

})


export default EditProductScreen