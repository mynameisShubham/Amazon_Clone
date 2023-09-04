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
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Zocial from 'react-native-vector-icons/Zocial';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();
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
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: 12,
                        color: '#041E42'
                    }}>
                        Register To your Account
                    </Text>
                </View>

                {/* name block */}
                <View style={{ marginTop: 50 }}>
                    <View style={styles.inputBox}>
                        <Ionicons
                            style={{ marginLeft: 8 }}
                            name='person'
                            color={'gray'}
                            size={20}
                        />
                        <TextInput style={{
                            color: 'gray',
                            marginVertical: 5,
                            width: 300,
                            fontSize: name ? 16 : 16
                        }}
                            value={name}
                            returnKeyType="next"
                            placeholder='Enter Your Name'
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                </View>

                {/* email block */}
                <View style={{ marginTop: 5 }}>
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
                                marginVertical: 5,
                                width: 300,
                                fontSize: email ? 16 : 16
                            }}
                            value={email}
                            placeholder='Enter Your Email'
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>

                {/* password block */}
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
                            marginVertical: 5,
                            width: 300,
                            fontSize: password ? 16 : 16
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
                <Pressable style={{
                    width: 200,
                    backgroundColor: '#FEBE10',
                    borderRadius: 6,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: 15
                }}
                >
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}
                    >Register
                    </Text>
                </Pressable>
                <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
                    <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>Already have an account? Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default RegisterScreen

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
        marginTop: 10,
    }
})