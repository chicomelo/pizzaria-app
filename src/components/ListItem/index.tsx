import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface ItemProps {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
        banner?: string;
    };
    deleteItem: (item_id: string) => void;
}

export function ListItem({ data, deleteItem }: ItemProps){

    function handleDeleteItem(){
        deleteItem(data.id)
    }

    return(
        <View style={styles.container}>
            <View style={styles.leftContent}>
                {data.banner && (
                    <Image
                        source={{ uri: data.banner }}
                        style={styles.image}
                    />
                )}
                <Text style={styles.item}>{data.name}: {data.amount}</Text>
            </View>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name='trash-2' color="#ff3f4b" size={24} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#101026',
        marginBottom: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,

    },
    item:{
        color: "#fff",
        flexShrink: 1,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
    },
    image: {
        width: 48,
        height: 48,
        resizeMode: 'cover',
        borderRadius: 50 ,
        marginRight: 12,
        backgroundColor: '#ccc'
    },

})