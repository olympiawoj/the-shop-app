import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
// import CartItem from "./CardItem"
import Colors from "../../constants/Colors"

const OrderItem = props => {
    const { amount, date } = props
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>
                    ${amount.toFixed(2)}
                </Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Button color={Colors.primary} title="Show Details" />
        </View>
    )
}


const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        //shadow only works on iOS, for android add elevation
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans'
    }
})
export default OrderItem;