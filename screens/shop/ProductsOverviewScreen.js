import React from "react"
import { View, FlatList, Text } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import ProductItem from "../../components/shop/ProductItem"
//merges all exports into one object
import * as cartActions from "../../store/actions/cart"


const ProductOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts)

    const dispatch = useDispatch()

    return (

        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => {
                return (
                    // <Text>{itemData.item.title}</Text>
                    <ProductItem
                        onViewDetail={() => {
                            props.navigation.navigate('ProductDetail', {
                                productId: itemData.item.id,
                                productTitle: itemData.item.title
                            })
                        }}
                        onAddToCart={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }
                        }
                        title={itemData.item.title}
                        price={itemData.item.price}
                        imageUrl={itemData.item.imageUrl} />
                )
            }} />

    )
}

ProductOverviewScreen.navigationOptions = {
    headerTitle: "All Products"
}

export default ProductOverviewScreen