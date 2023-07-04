import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, Text } from 'react-native';
import AppItem from './AppItem';
import Database from './Database';

export default function AppList({ route, navigation }) {
  const [items, setItems] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Seja bem vindo!',
    });
  }, [navigation]);
  useEffect(() => {
    const fetchData = async () => {
      const items = await Database.getItems();
      setItems(items);
    };
  
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
  
    return unsubscribe;
  }, [navigation]);
  

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require('./assets/efeira.png')} style={styles.image} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.itemsContainer}
      >
        {items.length > 0 ? (
          items.map(item => (
            <AppItem
              key={item.id}
              id={item.id}
              nome={item.nome}
              quantidade={item.quantidade}
              classificacao={item.classificacao}
              valor={item.valor}
              navigation={navigation}
            />
          ))
        ) : (
          <Text style={styles.itemText}>Nenhum item cadastrado</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemText: {
    paddingTop: 50,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#feeefc',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20
  },
  scrollContainer: {
    flex: 1,
    width: '95%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  itemsContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 100, // Adicione um preenchimento inferior maior para permitir a rolagem
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
});
