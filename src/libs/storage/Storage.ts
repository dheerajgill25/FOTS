import AsyncStorage from "@react-native-async-storage/async-storage";


class Storage {
    async setItem(key: string, value: any){
        return await AsyncStorage.setItem(key, value.toString())
    }
    async getItem(key: string){
        return await AsyncStorage.getItem(key)
    }
}
const StorageService = new Storage();
export default StorageService;