import React from 'react'
import { Icon, Dimmer, Loader, Button } from 'semantic-ui-react'

interface IProps {
  active: boolean
  deviceName: string | undefined
  scanDevice: Function | any
  loading: boolean
}


export default class ConnectScreen extends React.Component<IProps> {

  public render() {
    const { active, loading, deviceName, scanDevice } = this.props

    if (!active)
      return <div></div>

    return <header className="App-header">
      <Dimmer active={loading}>
        <Loader>Connecting to {deviceName ?? "Smart Hub"}</Loader>
      </Dimmer>

      <Icon name="wifi" className="App-logo" alt="logo" size="huge"></Icon>
      <p>Pair with a HIFE Hub to get started.</p>
      <Button onClick={scanDevice}>
        Scan
      </Button>
    </header>
  }
}
