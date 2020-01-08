import React, { useEffect, useState, useCallback } from "react"
import { View, Text, FlatList, Button, Platform, ActivityIndicator, StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import ProductItem from "../../components/shop/ProductItem"
//merges all exports into one object
import * as cartActions from "../../store/actions/cart"
import * as productActions from "../../store/actions/products"
import Colors from "../../constants/Colors"

const ProductOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        console.log("LOAD PRODUCTS")
        setError(null)
        setIsLoading(true)
        try {
            //waits for promise, http request ot be done
            await dispatch(productActions.fetchProducts())
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts
        )
        return () => {
            willFocusSub.remove()
        }
    }, [loadProducts])

    useEffect(() => {
        loadProducts()
    }, [dispatch, loadProducts])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        })
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button color={Colors.primary} title="Try again" onPress={loadProducts} />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        )
    }



    return (

        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => {
                return (
                    // <Text>{itemData.item.title}</Text>
                    <ProductItem
                        onSelect={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }}
                        // onAddToCart={() => {
                        //     dispatch(cartActions.addToCart(itemData.item))
                        // }
                        // }
                        title={itemData.item.title}
                        price={itemData.item.price}
                        imageUrl={itemData.item.imageUrl}
                    >
                        <Button
                            color={Colors.primary}
                            title="View Details"
                            onPress={() => {
                                selectItemHandler(itemData.item.id, itemData.item.title);
                            }}
                        />
                        <Button
                            color={Colors.primary}
                            title="To Cart"
                            onPress={() => {
                                dispatch(cartActions.addToCart(itemData.item));
                            }}
                        />
                    </ProductItem>
                )
            }} />

    )
}

ProductOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: "All Products",
        headerLeft:
            <HeaderButtons
                HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }} />
            </HeaderButtons>,
        headerRight:
            <HeaderButtons
                HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Cart" i
                    conName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }} />
            </HeaderButtons>
    }
}


const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }

})

export default ProductOverviewScreen