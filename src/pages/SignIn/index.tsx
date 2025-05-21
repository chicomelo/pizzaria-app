import React, { useContext, useState } from 'react'
import { ActivityIndicator, Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'

import { AuthContext } from '../../contexts/AuthContext'

export default function SignIn(){

    const { signIn, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function handleLogin(){
        if(!email|| !password ){
            return false;
        }

        await signIn({email, password})

    }

    return(
        <View style={styles.container}>
        
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Digite seu e-mail'
                    placeholderTextColor="#f0f0f0"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                  <TextInput
                    placeholder='Digite sua senha'
                    placeholderTextColor="#f0f0f0"
                    secureTextEntry={true}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={24} color="#f0f0f0" />
                        ) : (
                            <Text style={styles.buttonText}>Acessar</Text>
                        )
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1d1d2e"
    },
    logo:{
        marginBottom: 16
    },
    inputContainer:{
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 16
    },
    input:{
        width: '100%',
        height: 52,
        backgroundColor: '#101026',
        marginBottom: 12,
        paddingHorizontal: 16,
        color: '#ffffff'
    },
    button:{
        width: '100%',
        height: 52,
        backgroundColor: '#ff3f4b',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },
    buttonText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }
})