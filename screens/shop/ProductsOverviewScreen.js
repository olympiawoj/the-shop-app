import React from "react"
import { View, FlatList, Text } from "react-native"
import { useSelector } from "react-redux"


const ProductOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts)

    return (
        <View>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={itemData =>
                    <Text>{itemData.item.title}</Text>} />
        </View>
    )
}

ProductOverviewScreen.navigationOptions = {
    headerTitle: "All Products"
}

export default ProductOverviewScreen