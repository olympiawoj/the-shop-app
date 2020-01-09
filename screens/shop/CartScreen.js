import React, { useState } from "react"
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import Colors from "../../constants/Colors"
import CartItem from "../../components/shop/CartItem"
import * as cartActions from "../../store/actions/cart"
import * as orderActions from "../../store/actions/orders"
import Card from "../../components/UI/Card"


const CartScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    //cartItems is an object, not an array, but an array would be better, therefore use long form to return an array
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        //loop through all key value pairs and add each as item to array
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1)

    })
    const dispatch = useDispatch()
    console.log('transformed cart items', cartItems)


    const sendOrderHandler = async () => {
        setIsLoading(true)
        //returns a promise, await invisibly wraps into a then block
        await dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
        setIsLoading(false)
    }



    return (
        < View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> : <Button
                    color={Colors.accent}
                    title="ORDER NOW"
                    onPress={sendOrderHandler}
                    disabled={cartItems.length === 0} />}

            </Card>
            {/* List of Cart Items */}
            <View>
                <FlatList data={cartItems} keyExtractor={(item) => item.productId} renderItem={(itemData) =>
                    <CartItem
                        deletable
                        amount={itemData.item.sum}
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        onRemove={() => {
                            console.log(itemData.item.productId)
                            dispatch(cartActions.removeFromCart(itemData.item.productId))
                        }} />} />
            </View>
        </View >
    )
}

CartScreen.navigationOptions = {
    headerTitle: "Your Cart"
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
})

export default CartScreen