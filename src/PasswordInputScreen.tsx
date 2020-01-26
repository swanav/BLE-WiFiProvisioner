import React from 'react'

import { Icon, Button, Segment, Header, Input } from 'semantic-ui-react'

interface IProps {
    active: boolean
    ssid: string | undefined
    updatePassword: Function | any
    configureNetwork: Function
    password: string | undefined
    handleBackButton: Function
}

export default class PasswordInputScreen extends React.Component<IProps> {

    public render() {
        const { active, handleBackButton, ssid, updatePassword, configureNetwork, password } = this.props
        if(!active) return <div/>
        
        return <Segment inverted className="App password_input">
        <Icon name="arrow circle left" onClick={handleBackButton} color="yellow" size="large"></Icon>
        <Icon name="wifi" size="huge" color="blue"></Icon>
        <Header size="medium">{ssid}</Header>
        <Input placeholder='Password' size="large" onChange={updatePassword} />
        <Button onClick={() => { configureNetwork(password) }}>Connect</Button>
      </Segment>
    }
}
