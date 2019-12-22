import React from "react"
import { FlatList, Platform, Button } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import ProductItem from "../../components/shop/ProductItem"
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import Colors from "../../constants/Colors"

import * as productsActions from "../../store/actions/products"


//Output products as a FlatList using ProductItem
const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()
    return (
        <FlatList
            data={userProducts}

            keyExtractor={(item) => item.id}

            renderItem={(itemData) => {
                // console.log('this is the imageURL', itemData.item.imageUrl)
                return (
                    <ProductItem
                        title={itemData.item.title}
                        imageUrl={itemData.item.imageUrl}
                        price={itemData.item.price}
                        onSelect={() => { }}>
                        <Button
                            color={Colors.primary}
                            title="Edit"

                        />
                        <Button
                            color={Colors.primary}
                            title="Delete"
                            onPress={() => dispatch(productsActions.deleteProduct(itemData.item.id))}
                        />

                    </ProductItem>
                )

            }} />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Products",
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
    }
}

export default UserProductsScreen