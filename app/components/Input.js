import React, {Component} from 'react';
import {TextInput} from 'react-native';
import GlobalStyle from '../styles/global'




export default class Input extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextInput
                autoFocus={true} {...this.props} underlineColorAndroid={'transparent'} style={[GlobalStyle.input, this.props.style]}/>
        );
    }
}