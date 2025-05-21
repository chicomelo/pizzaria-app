import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import { ProductsProps } from '../../pages/Order';

interface ModalPickerProps{
    options: ProductsProps[];
    handleCloseModal: () => void;
    selectedItem: (item: ProductsProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function ProductModalPicker({options, handleCloseModal, selectedItem}: ModalPickerProps){

    
    function onPressItem(item: ProductsProps){
        selectedItem(item)
        handleCloseModal()
    }


    const option = options.map((item_option, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={()=> onPressItem(item_option)}>
            <Image
                source={{ uri: item_option.banner }}
                style={styles.productImg}
            />
            <Text style={styles.item}>
                {item_option.name}
            </Text>
        </TouchableOpacity>
    ))

    return(
        <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#1d1d2e',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)'
    },
    option:{
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    item:{
        margin: 18,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    productImg:{
        width: 48,
        height: 48,
        resizeMode: 'cover',
        borderRadius: 50 
    }
})