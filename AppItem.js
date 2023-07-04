import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Database from './Database';

export default function AppItem(props) {

  async function handleDeletePress() {
    Alert.alert(
      'Atenção',
      'Você tem certeza que deseja excluir este item?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            await Database.deleteItem(props.id);
            props.navigation.navigate('AppForm');
          },
        },
      ],
      { cancelable: false }
    );
  }

  async function handleEditPress() {
    const item = await Database.getItem(props.id);
    props.navigation.navigate('AppForm', item);
    console.log(props.id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{props.nome}</Text>
      <Text style={styles.textItem}>Quantidade: {props.quantidade}</Text>
      <Text style={styles.textItem}>Classificação: {props.classificacao}</Text>
      <Text style={styles.textItem}>Valor: {props.valor}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
          <Text style={styles.buttonText}>excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.buttonText}>editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 20,
        width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: '#d420c5',
        borderRadius: 0,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,

        backgroundColor: 'red',
        borderRadius: 0,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textItem: {
        fontSize: 20,
        color: '#d420c5'
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 4,
    }
});