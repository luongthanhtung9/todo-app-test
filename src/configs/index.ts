import { Platform } from 'react-native';

export const Config = {
    MODE: 'Staging',
    API_URL_SERVICE: 'http://14.248.82.147:81/',
    API_URL_AUTHORIZATION: 'http://14.248.82.147:85/',
    // API_URL_SERVICE: 'http://10.160.0.112:1081/',
    // API_URL_AUTHORIZATION: 'http://10.160.0.112:1085/',
    CODE_PUSH_KEY: Platform.select({
        android: 'yY7IRgoif9yiWlFVkjjajC_fR9Kxo1cDkE1kE',
        ios: 'XGfmNiL6eM6AjLKrH08isrQu_i4ZuEf5VbOfi',
    }),
    CODE_PUSH_PROJECT_NAME: Platform.select({
        android: 'kieunv.ttkd6-gmail.com/EDocAndroid',
        ios: 'kieunv.ttkd6-gmail.com/EDociOS',
    }),
};
