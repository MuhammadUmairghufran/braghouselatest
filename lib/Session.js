import {AsyncStorage} from 'react-native';

// Functions return promise
export async function getItem (item)  {
  try {

    return await AsyncStorage.getItem(item);

  } catch (error) {
    console.log(error.message);
  }
}

export async function saveItem (item, value) {
  AsyncStorage.setItem(item, value);
}

export async function clearItem () {
    return await AsyncStorage.clear();
}
