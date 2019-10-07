import React, { useState, useEffect } from 'react'

import { AsyncStorage, ScrollView, View, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'

import api from '../services/api'

import logo from '../assets/logo.png'

export default ({ props, navigation }) => {
    const [email, setEmail] = useState('')
    const [techs, setTechs] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then(user => user ? navigation.navigate('List') : '')
    }, [])

    async function handleSubmit() {
        const response = await api.post('/sessions', { email })

        const { _id } = response.data

        await AsyncStorage.setItem('user', _id)
        await AsyncStorage.setItem('techs', techs)

        navigation.navigate('List')
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>

        <View style={styles.form}>
            
                <Image source={logo} style={styles.logo} />

                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu melhor e-mail..."
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Encontrar Spots
                        </Text>
                </TouchableOpacity>
            
                </View>

</KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({

    container: {
        flex:1,
       alignItems: 'center',
       justifyContent: 'center'
    },

    form:{
        alignSelf: 'center',
        paddingHorizontal: 40,
        marginBottom: 25
    },

    logo: {
        alignSelf: 'center',
        marginBottom: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})
