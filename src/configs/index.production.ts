import { Platform } from 'react-native';

export const Config = {
    MODE: 'Production',
    API_URL_SERVICE: 'http://14.248.82.147:81/',
    API_URL_AUTHORIZATION: 'http://14.248.82.147:85/',
    CODE_PUSH_KEY: Platform.select({
        android: 'sW8YE1SV0IXr2CzsMO7mDRGQ8F-jurgCgF6Jt',
        ios: 'LiFfjlAxJTCwZtXyfHd1psQHQzcpNw0tb873u',
    }),
    CODE_PUSH_PROJECT_NAME: Platform.select({
        android: 'kieunv.ttkd6-gmail.com/EDocAndroid',
        ios: 'kieunv.ttkd6-gmail.com/EDociOS',
    })
};
