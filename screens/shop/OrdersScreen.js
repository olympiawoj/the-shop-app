import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Platform, ActivityIndicator, StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import OrderItem from "../../components/shop/OrderItem"
import * as ordersActions from "../../store/actions/orders"
import Colors from "../../constants/Colors"


const OrdersScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const orders = useSelector(state => state.orders.orders)

    const dispatch = useDispatch()

    useEffect(async () => {
        try {
            setIsLoading(true)
            await dispatch(ordersActions.fetchOrders())
            setIsLoading(false)
        }
        catch (error) {
            throw error
        }
    }, [dispatch])

    if (isLoading) {
        return <View style={styles.centered}><ActivityIndicator size={23} color={Colors.primary} /></View>
    }
    return (
        <View>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={(itemData) => (
                    <OrderItem items={itemData.item.items} amount={itemData.item.totalAmount} date={itemData.item.readableDate} />
                )} />
        </View>
    )


}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Orders",
        headerLeft:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }} />
            </HeaderButtons>
    }
}


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default OrdersScreen