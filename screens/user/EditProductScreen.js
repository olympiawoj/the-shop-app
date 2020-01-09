import React, { useState, useEffect, useCallback, useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as productsActions from "../../store/actions/products"
import { View, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView, ActivityIndicator } from "react-native"
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Input from "../../components/UI/Input"
import Colors from "../../constants/Colors";

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
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()


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

    //reruns whenever error changes
    useEffect(() => {
        if (error) {
            Alert.alert("An error occured!", error, [{ text: 'Okay' }])
        }
    }, [error])


    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong Input', 'Please check the errors in the form', [{ text: 'Okay' }])
            return;
        }

        setError(null)
        setIsLoading(true)
        try {
            if (editedProduct) {
                // console.log('title', title
                await dispatch(productsActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl))
            } else {
                await dispatch(productsActions.createProduct(formState.inputValues.title,
                    formState.inputValues.description, formState.inputValues.imageUrl,
                    +formState.inputValues.price
                )
                )
            }
            props.navigation.goBack()
        } catch (error) {
            setError(error.message)
        }

        setIsLoading(false)

    }, [dispatch, prodId, formState])


    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        // let isValid = false
        // if (inputValue.trim().length > 0) {
        //     isValid = true
        // }

        // console.log('is valid', isValid)
        dispatchFormState(
            {
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })

        console.log(
            'input value', inputValue)

    }, [dispatchFormState])

    if (isLoading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color={Colors.primary} /></View>
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
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
        </KeyboardAvoidingView>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }


})


export default EditProductScreen