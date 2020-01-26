import React from 'react';

import { InputOnChangeData } from 'semantic-ui-react'

import Provisioner from './Provisioner'

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import GatewayDevice from './GatewayDevice';
import { WifiScanningStatus } from './WifiScannerService';
import { WifiConfigurationStatus } from './WifiConfigurationService';

import ConnectScreen from './ConnectScreen'
import HubConfiguredScreen from './HubConfiguredScreen';
import ScanListScreen from './ScanListScreen';
import PasswordInputScreen from './PasswordInputScreen';

enum AppPage {
  CONNECT,
  SCAN_LIST,
  PASSWORD_INPUT,
  CONFIGURED
}

interface IState {
  deviceName: string | undefined
  page: AppPage
  connected: boolean
  loading: boolean
  ssid: string | undefined
  password: string | undefined
  networkList: string[]
  provisioner: Provisioner | undefined
}

class App extends React.Component<{}, IState> {

  provisioner: Provisioner | undefined

  constructor(props: {}) {
    super(props)
    this.state = {
      deviceName: undefined,
      networkList: [],
      ssid: undefined,
      page: AppPage.CONNECT,
      connected: false,
      password: undefined,
      provisioner: undefined,
      loading: false
    }

    this.scanDevice = this.scanDevice.bind(this)
    this.collectPassword = this.collectPassword.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)
    this.setLoading = this.setLoading.bind(this)
    this.handleConfigStateChange = this.handleConfigStateChange.bind(this)
    this.configureNetwork = this.configureNetwork.bind(this)
    this.handleScanStateChange = this.handleScanStateChange.bind(this)
  }

  async handleScanStateChange(state: WifiScanningStatus) {
    console.log('Scan State:', state)
    const { provisioner } = this.state
    if (provisioner) {
      if (state === WifiScanningStatus.ERROR) {
        console.error('Wifi scanning failed!!!')
        return
      }
      if (state === WifiScanningStatus.SCANNED) {
        console.log('scanned')
        let list = await provisioner.readScanList()
        console.log(list)
        if (list) {
          this.setState({
            networkList: list
          })
          this.setLoading(false)
          this.handleForwardButton()
        }
      }
    }
  }

  async handleConfigStateChange(state: WifiConfigurationStatus) {
    console.log('Config State:', state)
    if (state === WifiConfigurationStatus.ERROR) {
      console.error('Wifi Config failed!!!')
      return
    } else if (state === WifiConfigurationStatus.SAVED) {
      const { provisioner } = this.state
      if (provisioner) {
        console.log('Start join')
        await provisioner.joinWifi()
      }
    } else if (state === WifiConfigurationStatus.JOINED) {
      this.handleForwardButton()
    }
  }

  async scanDevice(_: any) {

    let provisioner

    try {
      this.setLoading(true)
      provisioner = new Provisioner(await GatewayDevice.searchDevice())
      await provisioner.init(this.handleConfigStateChange, this.handleScanStateChange)
      this.setLoading(false)
      this.setState({
        provisioner: provisioner
      })
      this.setLoading(true)
      await provisioner.getScanList()
    } catch (ex) {
      console.error('ERROR', ex)
    }
  }

  async collectPassword(networkName: string) {
    console.log('collectPassword')
    this.setLoading(true)
    this.setState({
      ssid: networkName
    })
    this.handleForwardButton()
    this.setLoading(false)

  }

  updatePassword(_: any, data: InputOnChangeData) {
    console.log('updatePassword', data.value)
    this.setState({
      password: data.value
    })
  }

  async configureNetwork(password: string | undefined) {
    console.log('configureNetwork')
    this.setLoading(true)
    const { ssid, provisioner } = this.state
    if (ssid && password)
      provisioner?.setWifiConfig(ssid, password)
    this.setLoading(false)
  }

  setLoading(status: boolean) {
    this.setState({
      loading: status
    })
  }

  handleBackButton() {
    const { page } = this.state
    if (page === AppPage.CONNECT)
      return
    let previousPage = page - 1
    this.setState({
      page: previousPage
    })
  }

  handleForwardButton() {
    const { page } = this.state
    if (page === AppPage.CONFIGURED)
      return
    let nextPage = page + 1
    this.setState({
      page: nextPage
    })
  }

  render() {

    const { deviceName, page, loading, networkList, ssid, password } = this.state
    return <div className="App">
      <ConnectScreen active={page === AppPage.CONNECT} deviceName={deviceName} loading={loading} scanDevice={this.scanDevice} />
      <ScanListScreen active={page === AppPage.SCAN_LIST} collectPassword={this.collectPassword} deviceName={deviceName} networkList={networkList} loading={loading} handleBackButton={this.handleBackButton} />
      <PasswordInputScreen active={page === AppPage.PASSWORD_INPUT} password={password} handleBackButton={this.handleBackButton} ssid={ssid} updatePassword={this.updatePassword} configureNetwork={this.configureNetwork} />
      <HubConfiguredScreen active={page === AppPage.CONFIGURED} deviceName={deviceName} loading={loading} handleBackButton={this.handleBackButton} ssid={ssid} />
    </div>
  }
}

export default App;
