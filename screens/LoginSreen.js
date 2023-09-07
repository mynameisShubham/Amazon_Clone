import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Zocial from 'react-native-vector-icons/Zocial';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken")
                if (token) {
                    navigation.replace("Main");
                }
            }
            catch (error) {
                console.log("error message", err);
            }
        };
        checkLoginStatus();
    }, [])

    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        }
        axios
            .post("http://192.168.29.108:8080/login", user)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);
                navigation.replace("Main")
            }).catch((error) => {
                Alert.alert("Login Error", "Invalid Email")
                console.log(error);
            })

    }
    return (
        <SafeAreaView style={styles.loginView}>
            <View>
                <Image style={{ width: 150, height: 100 }}
                    source={{
                        uri: "https://pngimg.com/uploads/amazon/amazon_PNG21.png"
                    }} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        marginTop: 12,
                        color: '#041E42'
                    }}>
                        Login In to your Account
                    </Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={styles.inputBox}>
                        <Zocial
                            style={{ marginLeft: 8 }}
                            name='email'
                            color={'gray'}
                            size={20}
                        />

                        <TextInput
                            style={{
                                color: 'gray',
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 18 : 18
                            }}
                            value={email}
                            placeholder='Enter Your Email'
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.inputBox}>
                        <Feather
                            style={{ marginLeft: 8 }}
                            name='lock'
                            color={'gray'}
                            size={20}
                        />

                        <TextInput style={{
                            color: 'gray',
                            marginVertical: 10,
                            width: 300,
                            fontSize: password ? 18 : 18
                        }}
                            value={password}
                            placeholder='Enter Your Password'
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text>Keep me logged in</Text>
                    <Text style={{ color: '#007FFF', fontWeight: '500' }}>Forget Password</Text>
                </View>

                <View style={{ marginTop: 40 }} />
                <Pressable
                    onPress={handleLogin}
                    style={{
                        width: 200,
                        backgroundColor: '#FEBE10',
                        borderRadius: 6,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: 15
                    }}
                >
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}
                    >Login
                    </Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
                    <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>Dont't have an Account? Sign Up</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default LoginSreen

const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#D0D0D0',
        paddingVertical: 1,
        borderRadius: 10,
        marginTop: 30,
    }
})