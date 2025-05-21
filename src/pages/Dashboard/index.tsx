import React, { useState } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'
import { api } from '../../services/api'

export default function Dashboard(){

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()
    const [number, setNumber] = useState('')

    async function openOrder(){
        if(!number){
            return
        }

        const response = await api.post('/order', {
            table: +number
        })

        navigation.navigate('Order', {
            number: number,
            order_id: response.data.id
        })

        setNumber('')

    }

    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.inputContainer}>
                <Text style={styles.title}>Novo pedido</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Número da mesa'
                    placeholderTextColor= "#f0f0f0" 
                    keyboardType='numeric'
                    value={number}
                    onChangeText={setNumber}
                />

                <TouchableOpacity style={styles.button} onPress={openOrder}>
                    <Text style={styles.buttonText}>Abrir mesa</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: '#1d1d2e'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24,
        width: '100%'
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
        fontSize: 21,
        backgroundColor: '#101026',
        marginBottom: 12,
        paddingHorizontal: 16,
        color: '#ffffff'
    },
    button:{
        width: '100%',
        height: 52,
        backgroundColor: '#3fffa3',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },
    buttonText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#101026'
    }
})