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

const mapStateToProps = (state) => {
    let user = state.user;
    let settings = state.settings;
    return {user,settings};
};
class blog extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isLoading: true,
            page:1,
            posts:[],
            last_page:false
        };
    }
    componentDidMount(){
        return this.getData()
    }
    getData(){
        return RequestServer('blog/?page='+this.state.page,{method:'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                let data={
                    isLoading: false,
                    posts: this.state.posts.concat(responseJson.posts.data),
                };
                if(responseJson.posts.last_page==this.state.page)
                    data['last_page']=true;
                this.setState(data);

            })
            .catch((error)=>{

            })
    };
    renderPost=({item})=>{
        // console.log(Object.keys(post));

        return (
            <View style={{paddingTop:0,paddingBottom:40}} >
                <Image style={{height:180,resizeMode:'cover'}} source={{uri:'https://www.bacharkh.com/image/post/'+item.image}} />
                <TextIranSans style={{fontSize:16,fontWeight: 'bold',padding:10,}}>{item.title}</TextIranSans>
                <TextIranSans style={[{paddingLeft:10,paddingRight:10}]}>{item.brief}</TextIranSans>

                <Button style={[globalStyles.buttonSuccess,{marginTop:20,paddingLeft:10,paddingRight:10}]} textStyle={globalStyles.buttonLabelWhite} onPress={()=>{this.props.navigation.navigate('post', { post_id: item.id })}}>{i18n.t('more')}</Button>
            </View>
        )
    };
    loadMore=()=>{
        if(!this.state.last_page)
            this.setState(
                {page:this.state.page+1,isLoading:true},
                this.getData
                )
    };
    render() {

        return (
            <SafeAreaView style={{flex: 1}}>
                        <View >
                            <FlatList data={this.state.posts} renderItem={this.renderPost} keyExtractor={(item,index)=>{index.toString()}} onEndReached={this.loadMore} onEndReachedThreshold={1}/>
                            {this.state.isLoading && (
                                <View><ActivityIndicator/></View>
                            )}
                        </View>
            </SafeAreaView>
        );
    }
}
export default connect(mapStateToProps)(blog)
