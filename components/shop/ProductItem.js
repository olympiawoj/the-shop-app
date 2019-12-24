import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native"
import { TouchableNativeFeedback } from "react-native-gesture-handler"
import Card from "../UI/Card"


const ProductItem = props => {
    const { title, price, imageUrl, onSelect, onAddToCart } = props
    // console.log('imageUrl in product item', imageUrl)

    let TouchableComponent = TouchableOpacity
    if (Platform.OS === 'android' && Platform.OS >= 21) {
        TouchableComponent = TouchableNativeFeedback
    }
    return (
        <Card style={styles.product} >
            <View style={styles.touchable}>
                <TouchableComponent onPress={onSelect} useForeground>

                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <View style={styles.details}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.price}>${price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>

                </TouchableComponent>
            </View>
        </Card >
    )
}


const styles = StyleSheet.create({
    product: {

        height: 300,
        margin: 20,


    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: '60%',

    },
    details: {
        alignItems: 'center',
        height: "17%",
        padding: 10,

    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'

    },
    price: {
        fontSize: 14,
        color: "#888",
        fontFamily: 'open-sans'
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: '23%',
        paddingHorizontal: 20
    }
})

export default ProductItem;