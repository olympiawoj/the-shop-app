import React, { useState } from 'react';
//Redux imports
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import productsReducer from "./store/reducers/products"
import cartReducer from "./store/reducers/cart"
import ordersReducer from "./store/reducers/orders"

//Navigation Imports
import ShopNavigator from "./navigation/ShopNavigation"
//Custom Font Imports
import { AppLoading } from "expo"
import * as Font from "expo-font"
//Redux Dev Tools

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
})

//remove composeWithDevTools before deploying app 
const store = createStore(rootReducer, composeWithDevTools())

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')

  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => {
        setFontLoaded(true)
      }} />
    )
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
