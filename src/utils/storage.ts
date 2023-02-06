import AsyncStorage from "@react-native-community/async-storage";
import { getUniqueId, getBundleId } from 'react-native-device-info'
import { encryptAES, decryptAES } from './encryption'

const sec = `${getBundleId()}.${getUniqueId()}`

export enum StorageKey {
    token,
    userName,
    fcmToken,
    version,
}
function getKey(key: StorageKey): string {
    let keyStr = '';
    switch (key) {
        case StorageKey.token:
            return 'TOKEN';
        case StorageKey.userName:
            return 'USER_NAME';
        case StorageKey.fcmToken:
            return 'FCM_TOKEN';
        case StorageKey.version:
            return 'VERSION';
        default:
            return '';
    }
}

var currentStore = {
    state: {

    },
    get: (key: any) => {
        if (!!currentStore.state[key]) {
            return Promise.resolve(currentStore.state[key])
        }
        return new Promise((resolve) => {
            try {
                AsyncStorage.getItem(key).then(value => {
                    currentStore.state[key] = value;

                    if (value != null) {
                        try {
                            let newValue = decryptAES(value, sec);
                            // console.log('newValue', key, value, newValue)
                            currentStore.state[key] = newValue;
                            resolve(newValue)
                        } catch (error) {
                            // console.log('newValue::error', key, value, error)
                            resolve(value)
                        }
                    } else {
                        resolve(value)
                    }
                }).catch(error => {
                    console.log('error2222222', key, error)
                })
            } catch (error) {
                console.log('error', key, error)
                resolve(null)
            }
        });
    },
    set: (key: any, value: any) => {
        currentStore.state[key] = value;
        try {
            let encryptValue = encryptAES(value, sec)
            // console.log('newValue::encryptValue', key, encryptValue)
            AsyncStorage.setItem(key, encryptValue)
        } catch (error) {

        }
    },
    remove: async (key: any) => {
        try {
            currentStore.state[key] = null;
            await AsyncStorage.removeItem(key);
        } catch (error) {

        }
    }
}

export const getItemCurrentInStore = (key: StorageKey) => {
    try {
        return currentStore.state[getKey(key)];
    } catch (error) {
        // Error retrieving data

    }
}

export const saveItemToStorage = async (key: StorageKey, value: string) => {
    try {
        // await AsyncStorage.setItem(getKey(key), value);
        currentStore.set(getKey(key), value);
    } catch (error) {
        // Error retrieving data

    }
};

export const getItemFromStorage = async (key: StorageKey) => {
    try {
        const value = await currentStore.get(getKey(key));
        return value;
    } catch (error) {
        // Error retrieving data
        return undefined;
    }
};

export const deleteItemFromStorage = async (key: StorageKey) => {
    try {
        currentStore.remove(getKey(key));
    } catch (error) {
        // Error retrieving data

    }
}

export const deleteAllItemFromStorage = async () => {
    await AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
}

export const clearStorageForLogout = async () => {
    currentStore.remove(getKey(StorageKey.userName));
    currentStore.remove(getKey(StorageKey.version));
    currentStore.remove(getKey(StorageKey.fcmToken));
    currentStore.remove(getKey(StorageKey.token));
}
