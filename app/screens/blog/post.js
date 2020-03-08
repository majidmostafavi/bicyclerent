/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text, SafeAreaView, ActivityIndicator, Image, TouchableHighlight,FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../components/I18n';
import {connect} from "react-redux";
import Button from "../../components/Button";
import {setUser} from "../../redux/actions";
import TextIranSans from "../../components/TextIranSans";
import GlobalStyle from "../../styles/global";
import RequestServer from "../../components/api/request-server";
import {globalStyles} from "../../styles";
import {commafy, convertDigit} from "../../components/helpers";
import HTML from 'react-native-render-html';

const mapStateToProps = (state) => {
    let user = state.user;
    let settings = state.settings;
    return {user,settings};
};
class post extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isLoading: true,
        };
    }
    componentDidMount(){
        this.getData()
    }
    getData= async () => {
        RequestServer('blog/'+this.props.navigation.state.params.post_id,{method:'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                let data={
                    isLoading: false,
                    post: responseJson,
                };
                this.setState(data);

            })
            .catch((error)=>{

            })
    };
    render() {
        if(this.state.isLoading){
            return(
                <SafeAreaView style={{flex: 1, padding: 20}}>
                    <View><ActivityIndicator/></View>
                </SafeAreaView>
            )
        }
        return (
            <SafeAreaView style={{flex: 1}}>
                        <ScrollView >
                            {this.state.isLoading && (
                                <View><ActivityIndicator/></View>
                            )}
                            <View >
                                <Image style={{height:180,resizeMode:'cover'}} source={{uri:'https://www.bacharkh.com/image/post/'+this.state.post.image}} />
                                <Text style={{textAlign: 'right',fontSize:18,fontWeight: 'bold',margin:10,marginTop:10}}>{this.state.post.title}</Text>
                                <HTML html={this.state.post.content} containerStyle={{marginLeft:10,marginRight:10}} baseFontStyle={{fontFamily: "IRANSansMobile",textAlign:"left"}}/>
                            </View>
                        </ScrollView>
            </SafeAreaView>
        );
    }
}
export default connect(mapStateToProps)(post)
