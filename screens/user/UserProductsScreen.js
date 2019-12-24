import React from "react"
import { FlatList, Platform, Button, Alert } from "react-native"
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


    const editProductHandler = (id) => {
        //fwd productId as routing parameter
        props.navigation.navigate('EditProduct', { productId: id })
    }

    const deleteHandler = (id) => {
        Alert.alert(' Are you sure?', ' Do you really want to delete this item?', [
            { text: "No", style: 'default' },
            {
                text: "Yes", style: 'destructive',
                onPress: () => dispatch(productsActions.deleteProduct(id))
            }]
        )

    }
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
                        onSelect={() => {
                            editProductHandler(itemData.item.id)
                        }}>
                        <Button
                            color={Colors.primary}
                            title="Edit"
                            onPress={() => {
                                editProductHandler(itemData.item.id)
                            }}

                        />
                        <Button
                            color={Colors.primary}
                            title="Delete"
                            // onPress={deleteHandler.bind(this, itemData.item.id)}
                            onPress={() => {
                                deleteHandler(itemData.item.id)
                            }}
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
        headerRight:
            <HeaderButtons
                HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add"
                    iconName={Platform.OS === "android" ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditProduct')
                    }} />
            </HeaderButtons>,
    }
}

export default UserProductsScreen