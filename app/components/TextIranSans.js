import React, {Component} from 'react';
import {Text} from 'react-native';
import {globalStyles} from '../styles'


export default class TextIranSans extends Component {
    constructor(props) {
        super(props);
    }

    correctPersianNumber = (inputString) => {
        let persian = {0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '۴', 5: '۵', 6: '۶', 7: '۷', 8: '۸', 9: '۹'}

        try {
            return String(inputString).replace(/[0-9]/g, function(num) {
                return persian[num]
            })
        } catch (e) {
            return inputString
        }
    };

    render() {
        return (
            <Text {...this.props} style={[globalStyles.textIranSans, this.props.style]}>{this.props.children}</Text>
        );
    }
}