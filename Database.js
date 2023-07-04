import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveItem(listItem, id) {
    const savedItems = await getItems();
    
    if (id) {
      const existingItemIndex = savedItems.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        savedItems[existingItemIndex] = {
          ...savedItems[existingItemIndex],
          nome: listItem.nome,
          quantidade: listItem.quantidade,
          classificacao: listItem.classificacao,
          valor: listItem.valor
        };
      }
    } else {
      const existingItemIndex = savedItems.findIndex(item => item.nome === listItem.nome);
      if (existingItemIndex !== -1) {
        savedItems[existingItemIndex].quantidade += listItem.quantidade;
      } else {
        listItem.id = new Date().getTime();
        savedItems.push(listItem);
      }
    }
  
    return AsyncStorage.setItem('items', JSON.stringify(savedItems));
  }
  
  
  
  
async function getItems(){
    const response = await AsyncStorage.getItem('items');
    if (response)
        return Promise.resolve(JSON.parse(response));

    else
        return Promise.resolve([]);
}

async function getItem(id){
    const savedItems = await getItems();
    return savedItems.find(item => item.id === id);
}

async function deleteItem(id) {
  let savedItems = await getItems();
  const index = savedItems.findIndex(item => item.id === id);
  savedItems.splice(index, 1);
  await AsyncStorage.setItem('items', JSON.stringify(savedItems));
  return savedItems;
}
 
module.exports = {
    saveItem,
    getItems,
    getItem,
    deleteItem
}