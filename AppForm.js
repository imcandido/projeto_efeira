
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Database from './Database';

export default function AppForm({ route, navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Seja bem vindo!',
    });
  }, [navigation]);


  console.log(route.params)
  const id = route.params ? route.params.id : undefined;
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [valor, setValor] = useState('');

  function handleNomeChange(nome) { setNome(nome); }
  function handleQuantidadeChange(quantidade) { setQuantidade(quantidade); }
  function handleClassificacaoChange(classificacao) { setClassificacao(classificacao); }
  function handleValorChange(valor) { setValor(valor); }

  useEffect(() => {
    if (!route.params) return;
    setNome(route.params.nome);
    setQuantidade(route.params.quantidade.toString());
    setClassificacao(route.params.classificacao);
    setValor(route.params.valor.toString());
  }, [route])

  async function handleButtonPress() {
    const listItem = { nome, quantidade: parseInt(quantidade), classificacao, valor: parseFloat(valor) };
    console.log(listItem)
    const newId = route.params ? route.params.id : new Date().getTime();
    console.log(newId)
    if (classificacao.length == 0 || valor == 0) {
      Alert.alert(
        "Atenção",
        "Não é possível inserir items sem classificação ou valor = 0.",
        [
          {
            text: "Ok", onPress: () => { }
          }
        ],
        { cancelable: false }
      );

    } else {
      try {
        await Database.saveItem(listItem, newId);
        setNome('');
        setQuantidade('');
        setClassificacao('');
        setValor('');
        route.params = {};
        navigation.navigate('AppList', { id: newId });
      } catch (error) {
        console.error('Error saving item:', error);
      }
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar novo produto</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleNomeChange}
          placeholder="Nome do produto"
          clearButtonMode="always"
          value={nome}
        />
        <TextInput
          style={styles.input}
          onChangeText={handleQuantidadeChange}
          placeholder="Digite a quantidade"
          keyboardType={'numeric'}
          clearButtonMode="always"
          value={quantidade.toString()}
        />
        <TextInput
          style={styles.input}
          onChangeText={handleClassificacaoChange}
          placeholder="Classificação"
          clearButtonMode="always"
          value={classificacao}
        />
        <TextInput
          style={styles.input}
          onChangeText={handleValorChange}
          placeholder="Valor"
          keyboardType={'numeric'}
          clearButtonMode="always"
          value={valor}
        />

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <View style={styles.buttonContainer}>
            <Icon name="save" size={22} color="white" />
            <Text style={styles.buttonText}>Salvar</Text>
          </View>

        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
}


const styles = StyleSheet.create({
  title: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '95%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch'
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#d420c5',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: "row"
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#feeefc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    width: '95%',
  },
});

