

// const UUID = {
//     WIFI_CONFIGURATION: {
//       SERVICE: '2b42180d-0000-1000-9900-00805f9b5ab3',
//       STATUS: '0000180d-0000-1000-9901-00805f9b34fb',
//       SSID: '0000180d-0000-1000-9902-00805f9b34fb',
//       PASSWORD: '0000180d-0000-1000-9903-00805f9b34fb',
//       SECURITY: '0000180d-0000-1000-9904-00805f9b34fb'
//     }
// }

export default class WifiConfigurationService {

    static uuid: string = '2b42180d-0000-1000-9900-00805f9b5ab3'

    private server: BluetoothRemoteGATTServer
    service: BluetoothRemoteGATTService | null = null

    status: WifiConfigurationStatusCharacteristic | undefined
    ssid: WifiConfigurationSsidCharacteristic | undefined
    password: WifiConfigurationPasswordCharacteristic | undefined
    security: WifiConfigurationSecurityCharacteristic | undefined

    statusChangeCallback: Function

    constructor(server: BluetoothRemoteGATTServer, onStatusChange: Function) {
        this.server = server
        this.statusChangeCallback = onStatusChange
    }

    async init() {
        try {

            await this.server.getPrimaryService(WifiConfigurationService.uuid).then(service => this.service = service)
            await this.initialiseCharacteristics()

        } catch(ex) {
            console.error(ex)
        }
        return 
    }

    async initialiseCharacteristics() {
        if (!this.service) {
            console.error('No Service found')
            return
        }
        this.status = new WifiConfigurationStatusCharacteristic(this.service, this.statusChangeCallback)
        this.ssid = new WifiConfigurationSsidCharacteristic(this.service)
        this.password = new WifiConfigurationPasswordCharacteristic(this.service)
        this.security = new WifiConfigurationSecurityCharacteristic(this.service)
        await Promise.all([this.status.init(),
            this.ssid.init(),
            this.password.init(),
            this.security.init()]
        )
    }

}

export enum WifiConfigurationStatus {
    IDLE,
    SAVE,
    SAVING,
    SAVED,
    JOIN,
    JOINING,
    JOINED,
    ERROR
}

export class WifiConfigurationStatusCharacteristic {
    static uuid = '0000180d-0000-1000-9901-00805f9b34fb'

    service: BluetoothRemoteGATTService
    characteristic: BluetoothRemoteGATTCharacteristic | undefined
    callback: Function
    
    constructor(service: BluetoothRemoteGATTService, callback: Function) {
        this.service = service
        this.callback = callback
    }

    async init() {
        this.characteristic = await this.service.getCharacteristic(WifiConfigurationStatusCharacteristic.uuid)
        this.characteristic.addEventListener("characteristicvaluechanged", (event: Event) => {
            let status = (event.target as BluetoothRemoteGATTCharacteristic).value?.getUint8(0)
            if(this.callback) this.callback(status as WifiConfigurationStatus)
        })  
        this.characteristic.startNotifications()     
    }

    async getStatus():Promise<WifiConfigurationStatus> {
        if (!this.characteristic) {
            console.error('No Characteristic found')
            return WifiConfigurationStatus.ERROR
        }
        let status = await this.characteristic.readValue()
        if (status.buffer.byteLength === 1) {
            let state: WifiConfigurationStatus = status.getUint8(0)
            console.info('Wifi Configuration State', state)
            if(state < WifiConfigurationStatus.ERROR) {
                return state as WifiConfigurationStatus
            }
        }
        return WifiConfigurationStatus.ERROR
    }

    async setStatus(status: WifiConfigurationStatus) {
        if (!this.characteristic) {
            console.error('No Characteristic found')
            return
        }
        if ((status !== WifiConfigurationStatus.SAVE) && (status !== WifiConfigurationStatus.JOIN))
            return
        return await this.characteristic.writeValue(Buffer.from([status]))
    }

}

export class WifiConfigurationSsidCharacteristic {
    static uuid = '0000180d-0000-1000-9902-00805f9b34fb'

    service: BluetoothRemoteGATTService
    characteristic: BluetoothRemoteGATTCharacteristic | undefined

    constructor(service: BluetoothRemoteGATTService) {
        this.service = service
    }

    async init() {
        this.characteristic = await this.service.getCharacteristic(WifiConfigurationSsidCharacteristic.uuid)
    }

    async setSsid(ssid: string) {
        if (!this.characteristic) {
            console.error('No Characteristic found')
            return
        }
        return await this.characteristic.writeValue(Buffer.from(ssid))
    }
}

export class WifiConfigurationPasswordCharacteristic {
    static uuid = '0000180d-0000-1000-9903-00805f9b34fb'

    service: BluetoothRemoteGATTService
    characteristic: BluetoothRemoteGATTCharacteristic | undefined

    constructor(service: BluetoothRemoteGATTService) {
        this.service = service
    }

    async init() {
        this.characteristic = await this.service.getCharacteristic(WifiConfigurationPasswordCharacteristic.uuid)
    }

    async setPassword(password: string) {
        if (!this.characteristic) {
            console.error('No Characteristic found')
            return
        }
        return await this.characteristic.writeValue(Buffer.from(password))
    }

}

export class WifiConfigurationSecurityCharacteristic {
    static uuid = '0000180d-0000-1000-9904-00805f9b34fb'

    service: BluetoothRemoteGATTService
    characteristic: BluetoothRemoteGATTCharacteristic | undefined

    constructor(service: BluetoothRemoteGATTService) {
        this.service = service
    }

    async init() {
        this.characteristic = await this.service.getCharacteristic(WifiConfigurationSecurityCharacteristic.uuid)
    }

    async setSecurity(security: number) {
        if (!this.characteristic) {
            console.error('No Characteristic found')
            return
        }
        return await this.characteristic.writeValue(Buffer.from([security]))
    }

}
