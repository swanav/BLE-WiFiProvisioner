export default class WifiScannerService {

    static uuid: string = '2b42180d-0000-1000-7700-00805f9b5ab3'

    private service: BluetoothRemoteGATTService | null = null
    private server: BluetoothRemoteGATTServer
    status: WifiScanningStatusCharacteristic | null = null
    list: WifiScanningList1Characteristic | null = null
    statusChangeCallback: Function

    constructor(server: BluetoothRemoteGATTServer, onStatusChange: Function) {
        this.server = server
        this.statusChangeCallback = onStatusChange
    }

    async init() {
        console.log('init')
        try {
            this.service = await this.server.getPrimaryService(WifiScannerService.uuid)
            console.log('WifiScannerService', this.service, 'isAvailable')
            await this.initialiseCharacteristics()
            console.log('WifiScannerService', 'characteristics', 'isAvailable')

        } catch(ex) {
            console.error(ex)
        }
        return
    }

    async initialiseCharacteristics() {
        if(!this.service) {
            console.error('No Service found')
            return
        }
        this.status = new WifiScanningStatusCharacteristic(this.service, this.statusChangeCallback)
        this.list = new WifiScanningList1Characteristic(this.service)
        await this.status.init()
        await this.list.init()
    }

}

export enum WifiScanningStatus{
    IDLE,
    SCAN, 
    SCANNING, 
    SCANNED, 
    ERROR
}

export class WifiScanningStatusCharacteristic {
    static uuid = '2b42180d-0000-1000-7701-00805f9b5ab3'

    service: BluetoothRemoteGATTService
    characteristic: BluetoothRemoteGATTCharacteristic | undefined
    callback: Function

    constructor(service: BluetoothRemoteGATTService, callback: Function) {
        this.service = service
        this.callback = callback
    }

    async init() {
        this.characteristic = await this.service.getCharacteristic(WifiScanningStatusCharacteristic.uuid)
        this.characteristic.addEventListener("characteristicvaluechanged", (event: Event) => {
            let status = (event.target as BluetoothRemoteGATTCharacteristic).value?.getUint8(0)
            if(this.callback) this.callback(status as WifiScanningStatus)
        })
        this.characteristic.startNotifications()
    }

    async getStatus():Promise<WifiScanningStatus> {
        if(!this.characteristic) {
            console.error('No Characteristic found')
            return WifiScanningStatus.ERROR
        }
        let status = await this.characteristic.readValue()
        if(status.buffer.byteLength === 1) {
            let state:WifiScanningStatus = status.getUint8(0)
            console.info('ye state aayi hai', state)
            if(state < WifiScanningStatus.ERROR) {
                return state as WifiScanningStatus
            }
        }
        return WifiScanningStatus.ERROR
    }

    async setStatus(status: WifiScanningStatus) {
        if(!this.characteristic) {
            throw Error('No Characteristic found')
        }
        if(status !== WifiScanningStatus.SCAN)
            return
        return await this.characteristic.writeValue(Buffer.from([status]))
    }

}

export class WifiScanningList1Characteristic {
    static uuid = '2b42180d-0000-1000-7702-00805f9b5ab3'

    service: BluetoothRemoteGATTService
    characteristic: BluetoothRemoteGATTCharacteristic | undefined

    constructor(service: BluetoothRemoteGATTService) {
        this.service = service
    }

    async init() {
        this.characteristic = await this.service.getCharacteristic(WifiScanningList1Characteristic.uuid)
    }

    async getList1():Promise<string> {
        if(!this.characteristic) {
            throw Error('No Characteristic found')
        }
        let networks = await this.characteristic.readValue()
        let string = new TextDecoder("utf-8").decode(networks.buffer)
        console.log('yaha kara read', string)
        return string
    }

}
