import React from "react";
import { ScrollView, View, Text, Image, Button, StyleSheet } from "react-native"
import { useSelector } from "react-redux"

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))

    return (
        <View>
            <Text>
                {selectedProduct.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({})

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}
export default ProductDetailScreen;