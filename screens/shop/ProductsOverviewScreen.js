import React, { useEffect } from "react"
import { View, FlatList, Text, Button, Platform } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import ProductItem from "../../components/shop/ProductItem"
//merges all exports into one object
import * as cartActions from "../../store/actions/cart"
import * as productActions from "../../store/actions/products"
import Colors from "../../constants/Colors"

const ProductOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(productActions.fetchProducts())
    }, [dispatch])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        })
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

export default ProductOverviewScreen