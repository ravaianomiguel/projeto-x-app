import * as SecureStore from 'expo-secure-store';

export async function storageSet(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function storageGet(key) {
  let val = await SecureStore.getItemAsync(key);
  return {
    ok: val ? true : false,
    val
  }
}