import React, {Component} from 'react';
import {
    View,
    Modal, TouchableOpacity,
    YellowBox, SafeAreaView
} from 'react-native';

export default class TransparentModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <SafeAreaView style={{flex: 1}}>
                    <View style={{backgroundColor: "rgba(0,0,0,0.5)", flex: 1, padding: 10,justifyContent: 'center'}} >
                        <View style={{backgroundColor: "#fafbff",height: this.props.height, maxHeight:this.props.maxHeight, borderRadius: 3, overflow: "hidden"}}>
                            {this.props.children}
                        </View>
                    </View>
                </SafeAreaView>
        );
    }
}
TransparentModal.defaultProps = {
    maxHeight:'100%',
    height:'auto',
}