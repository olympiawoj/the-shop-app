import React from "react"
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Input from "../../components/UI/Input"
import Card from "../../components/UI/Card"


import Colors from "../../constants/Colors"

const AuthScreen = props => {
    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}>
            <LinearGradient
                colors={['#ffedff', '#ffe3ff']}
                style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            autoCapitalize="none"
                            email
                            errorMessage="Please enter a valid email address"
                            id="email"
                            initialValue=""
                            label="Email"
                            keyboardType="email-address"
                            required
                            onInputChange={() => { }} />
                        <Input
                            autoCapitalize="none"
                            errorMessage="Please enter a valid password"
                            id="password"
                            initialValue=""
                            label="Password"
                            keyboardType="default"
                            secureTextEntryr
                            required
                            minLength={5}
                            onInputChange={() => { }} />
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Login"
                            color={Colors.primary}
                            onPress={() => { }} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Switch to Signup"
                            color={Colors.accent}
                            onPress={() => { }} />
                    </View>

                </Card>
            </LinearGradient>
        </KeyboardAvoidingView >
    )
}

AuthScreen.navigationOptions = {
    headerTitle: "Authenticate"
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
})

export default AuthScreen