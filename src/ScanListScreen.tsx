import React from 'react'
import { Icon, Dimmer, Loader, Segment, Table, Header } from 'semantic-ui-react'

interface IProps {
    active: boolean
    deviceName: string | undefined
    loading: boolean
    networkList: string[]
    collectPassword: Function
    handleBackButton: Function
}

export default class ScanListScreen extends React.Component<IProps> {

    public render() {
        const { active, collectPassword, deviceName, loading, handleBackButton, networkList } = this.props
        if(!active) return <div/>
        
        return <Segment inverted className="App scan_list">
        <Dimmer active={loading}>
          <Loader>Connecting to {deviceName ?? "Smart Hub"}</Loader>
        </Dimmer>
        <Icon name="arrow circle left" onClick={handleBackButton} color="yellow" size="large"></Icon>
        <Header>
          {deviceName ?? "Havells"}
        </Header>
        <Table inverted>
          <Table.Body>
            {
              networkList.map((network, index) => <Table.Row key={index}><Table.Cell onClick={() => { collectPassword(network) }}>{network}</Table.Cell></Table.Row>)
            }
          </Table.Body>
        </Table>
      </Segment>
    }
}
