import React, { useState, useEffect, useCallback, useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as productsActions from "../../store/actions/products"
import { View, Text, TextInput, ScrollView, StyleSheet, Platform, Alert } from "react-native"
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Input from "../../components/UI/Input"

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
            dispatch(productsActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl))
        } else {
            dispatch(productsActions.createProduct
                (formState.inputValues.title,
                    formState.inputValues.description, formState.inputValues.imageUrl,
                    +formState.inputValues.price))
        }
        props.navigation.goBack()
    }, [dispatch, prodId, formState])


    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        let isValid = false
        if (inputValue.trim().length > 0) {
            isValid = true

        }

        console.log('is valid', isValid)
        dispatchFormState(
            {
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })

    }, [dispatchFormState])

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id="title"
                    label="Title"
                    errorText="Please enter a valid title!"
                    autoCapitalize="sentences"
                    autoCorrect
                    keyboardType="default"
                    returnKeyType="next"
                    style={styles.input}
                    value={formState.inputValues.title}
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid={!!editedProduct}
                    //validation
                    required
                />

                <Input
                    id="imageUrl"
                    label="Image url"
                    errorText="Please enter a valid image url!"
                    keyboardType="default"
                    returnKeyType="next"
                    style={styles.input}
                    value={formState.inputValues.imageUrl}
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initiallyValid={!!editedProduct}
                    required
                />

                {editedProduct ? null :
                    <Input
                        id="price"
                        label="Price"
                        errorText="Please enter a price!"
                        keyboardType="decimal-pad"
                        style={styles.input}
                        value={formState.inputValues.price}
                        onInputChange={inputChangeHandler}
                        required
                        min={0.1}
                    />
                }

                <Input
                    id="description"
                    label="Description"
                    errorText="Please enter a description!"
                    style={styles.input}
                    value={formState.inputValues.description}
                    multiline
                    //only used by Android
                    numberOfLines={3}
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initiallyValid={!!editedProduct}
                    required
                    minLength={5}
                />
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


})


export default EditProductScreen