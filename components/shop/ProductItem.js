import React from "react"
import { View, Text, Button, StyleSheet, Image } from "react-native"
import Colors from "../../constants/Colors"

const ProductItem = props => {
    const { title, price, imageUrl, onViewDetail, onAddToCart } = props
    return (
        <View style={styles.product}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <Button color={Colors.primary} title="View Details" onPress={onViewDetail} />
                <Button color={Colors.primary} title="Add To Cart" onPress={onAddToCart} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        //shadow only works on iOS, for android add elevation
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,

    },
    image: {
        width: '100%',
        height: '60%',

    },
    details: {
        alignItems: 'center',
        height: "15%",
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: "#888"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: '25%',
        paddingHorizontal: 20
    }
})

export default ProductItem;