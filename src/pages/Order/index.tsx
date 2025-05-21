import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native'

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'
import { ModalPicker } from '../../components/ModalPicker'
import { ProductModalPicker } from '../../components/ProductModalPicker'
import { ListItem } from '../../components/ListItem'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'


type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

export type CategoryProps = {
    id: string;
    name: string;
}

export type ProductsProps = {
    id: string;
    name: string;
    banner?: string;
}

type ItemsProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
    banner?: string;
}

type OrderRouterProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order(){

    const route = useRoute<OrderRouterProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [category, setCategory] = useState<CategoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    const [products, setProducts] = useState<ProductsProps[] | []>([])
    const [productSelected, setProductSelected] = useState<ProductsProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false)

    const [amount, setAmount] = useState('1')

    const [items, setItems] = useState<ItemsProps[]>([])

    useEffect(()=>{
        async function loadingCategories(){
            const response = await api.get('/category')
            setCategory(response.data)
            setCategorySelected(response.data[0])
        }
        loadingCategories()
    }, [])

    useEffect(()=>{

        if (!categorySelected) return;

        async function loadingProducts(){
            const response = await api.get('/category/product',{
                params: {
                    category_id: categorySelected?.id
                }
            })
            setProducts(response.data)
            setProductSelected(response.data[0])
        }
        loadingProducts()
    }, [categorySelected])

    async function handleCloseOrder(){
        try{
            await api.delete('/order',{
                params: {
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack()
            
        } catch (err){
            console.log(err)
        }
    }

    function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item)
    }
    function handleChangeProduct(item: ProductsProps){
        setProductSelected(item)
    }

    async function handleAdd(){

        const response = await api.post('/order/add', {
            order_id: route.params.order_id,
            product_id: productSelected?.id,
            amount: +amount
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount,
            banner: productSelected?.banner
        }

        setItems(oldArray => [...oldArray, data])

    }
    
    async function handleDeleteItem(item_id: string){
        await api.delete('/order/remove', {
            params: {
                item_id: item_id,
            }
        })

        let removeItem = items.filter(item => {
            return (item.id !== item_id)
        })

        setItems(removeItem)
    }

    function handleFinishOrder(){
        navigation.navigate("FinishOrder", {
            number: route.params?.number,
            order_id: route.params?.order_id
        })
    }

    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>

                {
                    items.length === 0 && (
                        <TouchableOpacity onPress={handleCloseOrder}>
                            <Feather name='trash-2' size={24} color="#ff3f4b" />
                        </TouchableOpacity>
                    )
                }

            </View>

            {
                category.length !== 0 && (
                    <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                        <Text style={{color: '#fff'}}>
                            {categorySelected?.name}
                        </Text>
                    </TouchableOpacity>
                )
            }

            {
                categorySelected && products.length !== 0  && (
                    <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                        <Text style={{color: '#fff'}}>{productSelected?.name}</Text>
                    </TouchableOpacity>
                )
            }

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, {width: '60%', textAlign: 'center', marginBottom: 0}]}
                    placeholderTextColor="#fff"
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={handleFinishOrder}
                    style={[styles.button, {opacity: items.length === 0 ? 0.4 : 1}]}
                    disabled={items.length === 0}
                >
                    <Text style={[styles.buttonText, {color: '#1d1d2e'}]}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{flex: 1, marginTop: 24}}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={ ({item}) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />
           
            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={ () => setModalCategoryVisible(false) }
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType='fade'
            >
                <ProductModalPicker
                    handleCloseModal={ () => setModalProductVisible(false) }
                    options={products}
                    selectedItem={handleChangeProduct}
                />
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#1d1d2e",
        paddingTop: '8%',
        paddingHorizontal: '5%'
    },
    header:{
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 42
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 16
    },
    input: {
        width: '100%',
        justifyContent: 'center',
        height: 44,
        fontSize: 18,
        backgroundColor: '#101026',
        marginBottom: 12,
        paddingHorizontal: 16,
        color: '#ffffff'
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    buttonAdd:{
        width: '20%',
        height: 44,
        backgroundColor: '#3fb9ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    button:{
        width: '70%',
        height: 44,
        backgroundColor: '#3fffa3',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },
    buttonText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff'
    }

})