import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity , AsyncStorage, Alert} from 'react-native'

import api from '../services/api'

export default ({ props, navigation }) => {
    const [date, setDate] = useState('')

    const id = navigation.getParam('id')

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user')

        await api.post(`spots/${id}/bookings`, {date}, { headers: {user_id} })

    Alert.alert('Boa!', `Solicitação de reserva para a data ${date} enviada.`)

        navigation.navigate('List')
    }

    function handleCancel(){
        navigation.navigate('List')
    }

    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity onPress={() => navigation.navigate('List')} style={styles.goBackButton}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>
                    Solicitar Reserva
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>
                    Cancelar
                </Text>
            </TouchableOpacity>

        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    },

    form: {

    },

    label: {
        marginTop: 50,
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

    goBackButton: {
        position: 'absolute',
        left: 0,
        top:10,
        height: 40,
        width: 55,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },

    cancelButton: {
        marginTop: 10,
        backgroundColor: '#ccc',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})
