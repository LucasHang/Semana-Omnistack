import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import { Alert, Text, View, SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage, TouchableOpacity} from 'react-native'

import logo from '../assets/logo.png'

import SpotList from '../components/SpotList'

export default ({ props, navigation }) => {

    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.115:3001', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert('Suas Reservas', `Reserva em ${booking.spot.company} para ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs')
            .then(storagedTechs => {
                const techsArray = storagedTechs.split(',').map(tech => tech.trim())
                setTechs(techsArray)
            })

    }, [])

    async function handleLogout() {
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('techs')
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
    
                <Image source={logo} style={styles.logo}/>
  

                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 10
    },

    logoutButton: {
        position: 'absolute',
        right: 0,
        top:0,
        height: 40,
        width: 55,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})
