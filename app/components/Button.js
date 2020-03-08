import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {globalStyles} from '../styles/';
import TextIranSans from "../components/TextIranSans";


export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[globalStyles.button, ...this.props.style]}>
                    <TextIranSans style={[globalStyles.buttonLabel, this.props.textStyle]}>{this.props.children}</TextIranSans>
                </View>
            </TouchableOpacity>
        );
    }
}