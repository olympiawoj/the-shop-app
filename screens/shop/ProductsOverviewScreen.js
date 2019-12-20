import React from "react"
import { View, FlatList, Text } from "react-native"
import { useSelector } from "react-redux"
import ProductItem from "../../components/shop/ProductItem"


const ProductOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts)

    return (
        <View>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={itemData => {
                    return (
                        // <Text>{itemData.item.title}</Text>
                        <ProductItem
                            onViewDetail={() => { }}
                            onAddToCard={() => { }
                            }
                            title={itemData.item.title}
                            price={itemData.item.price}
                            imageUrl={itemData.item.imageUrl} />
                    )
                }} />
        </View>
    )
}

ProductOverviewScreen.navigationOptions = {
    headerTitle: "All Products"
}

export default ProductOverviewScreen