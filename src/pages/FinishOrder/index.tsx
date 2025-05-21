import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { api } from '../../services/api'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'

type RouteDetailParams = {
    FinishOrder: {
        number: string | number,
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder(){

    const route = useRoute<FinishOrderRouteProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    async function handleFinish(){
        try{
            await api.put('/order/send', {
                order_id: route.params?.order_id
            })

            navigation.popToTop();

        } catch (err){
            console.log('Erro ao finalizar, tente novamente mais tarde')
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.title}>Mesa {route.params?.number}</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={handleFinish}
            >
                <Feather name='shopping-cart' size={20} color="#1d1d2e" />
                <Text style={styles.textButton}>Finalizar pedido</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2d',
        paddingVertical: '8%',
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    title:{
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 24,
    },
    button:{
        backgroundColor: '#3fffa3',
        flexDirection: 'row',
        width: '65%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },
    textButton:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1d1d2e'
    }
})