import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";


class Storage {
    async setItem(key: string, value: any){
        return await AsyncStorage.setItem(key, value.toString())
    }
    async getItem(key: string){
        return await AsyncStorage.getItem(key)
    }
    async clearStorage (){
        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (asyncStorageKeys.length > 0) {
          if (Platform.OS === 'android') {
            await AsyncStorage.clear();
          }
          if (Platform.OS === 'ios') {
            await AsyncStorage.multiRemove(asyncStorageKeys);
          }
        }
    }
}
const StorageService = new Storage();
export default StorageService;