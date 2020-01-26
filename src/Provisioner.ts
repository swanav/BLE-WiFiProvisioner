import GatewayDevice from "./GatewayDevice";

export default class Provisioner {
    
    private device: GatewayDevice
    
    constructor(device: GatewayDevice) {
        this.device = device
    }

    async init(onConfigStatusChange: Function, onScanStatusChange: Function) {
        console.log("=====")
        await this.device.initialiseGattServer()
        await this.device.initialiseServices(onConfigStatusChange, onScanStatusChange)
        console.log("=====")
    }

    async getScanList(): Promise<void> {
        try {
            if(!this.device)
                throw Error("Could not find device")
            if(!this.device.scannerService)
                throw Error("could not find service")
            await this.device.getScanList()
        } catch(ex) {
            console.error(ex)
        }
        return
    }

    async readScanList(): Promise<string[]> {
        let scanList:string[] = ["Tesseract", "Poseidon"]
        try {
            if(!this.device)
                throw Error("Could not find device")
            if(!this.device.scannerService)
                throw Error("could not find service")
            scanList = await this.device.readScanList()
            console.log(scanList)
            return scanList
        } catch(ex) {
            console.error(ex)
        }
        return scanList
    }

    async setWifiConfig(ssid: string, password: string) {
        try {
            await this.device.pushCredentials(ssid, password, 2)
            await this.device.storeCredentials()
        } catch(ex) {
            console.error(ex)
        }
    }

    async joinWifi() {
        try {
            console.log('joinWifi')
            await this.device.joinNetwork()
            console.log('Joined')
        } catch(ex) {
            console.error(ex)
        }
    }

}
