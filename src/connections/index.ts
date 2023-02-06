import { saveToken } from '@redux/actions/configs';

export default class Connections {
    static _store = undefined
    static init(store: any) {
        let con = new Connections(store)
        window.connection = con
    }

    constructor(store: any) {
        Connections._store = store
    }

    expiredToken = () => {
        if (!!Connections._store)
            Connections?._store?.dispatch(saveToken(''))
    }

    versionApp = () => {
        if (!!Connections._store)
            return Connections?._store?.getState().configs.version
        else return '1.0'
    }

    fcmToken = () => {
        if (!!Connections._store)
            return Connections?._store?.getState().configs.fcmToken
        else return '1.0'
    }

}