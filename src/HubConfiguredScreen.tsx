import React from 'react'
import { Segment, Icon, Dimmer, Loader } from 'semantic-ui-react'

interface IProps {
    active: boolean
    deviceName: string | undefined
    handleBackButton: Function | undefined
    loading: boolean
    ssid: string | undefined
}


export default class HubConfiguredScreen extends React.Component<IProps> {

    public render() {
        const { active, loading, deviceName, ssid, handleBackButton } = this.props

        if(!active)
            return <div></div>

        return <Segment inverted className="App configured">
        <Dimmer active={loading}>
          <Loader>Connecting {deviceName ?? "Smart Hub"} to {ssid ?? "Smart Hub"}</Loader>
        </Dimmer>

        <Icon name="arrow circle left" onClick={handleBackButton} color="yellow" size="large"></Icon>
        <Icon name="check circle" size="massive" color="green"></Icon>
        <div>Your Smart Hub has been connected to WiFi successfully</div>
      </Segment>
    }
}
