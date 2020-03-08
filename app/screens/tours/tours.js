/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React ,{Component} from 'react';
import {
    View,
    ScrollView, SafeAreaView,
    Text,
    TouchableHighlight,
    ActivityIndicator, Dimensions,
} from 'react-native';
import {connect} from "react-redux";
import TourItem from '../../components/tours/details';
import i18n from '../../components/I18n';
import {globalStyles, TourStyles} from '../../styles';
import TextIranSans from "../../components/TextIranSans";
import RequestServer from "../../components/api/request-server";
import {commafy,convertDigit} from "../../components/helpers";
const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;

const mapStateToProps = (state) => {
    return state;
};
class index extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true};
    }
    componentDidMount(){
        return RequestServer('tours',{method:'GET'})
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    items: responseJson.data,
                }, function(){

                });

            })
            .catch((error)=>{

            })
    }
    getOrderId(tour_id,type){
        let params = {
            tour_id,
            type
        };
        RequestServer('tours/order',
            {
                method:'POST',
                data:params
            })
            .then((response) => response.json())
            .then((order) => {
                // this.props.navigation.navigate('reserve', { order_id: 278 });
                this.props.navigation.navigate('passenger', { order_id: order.order_id });
            })

    }
    checkLogin(){
        if(Object.keys(this.props.user).length>0){
            return true
        }
        return false
    }
    renderTourPriceBtnContainer(item){
        return(
            <View style={TourStyles.tourPriceBtnContainer}>
                <View style={[globalStyles.flexRow]}>{item.price && <TouchableHighlight onPress={()=>{if(this.checkLogin()){this.getOrderId(item.id,"normal")}else{this.props.navigation.navigate('Login')}}} style={[globalStyles.flex1,,globalStyles.buttonSuccess,globalStyles.button]}>
                    <View>
                        <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{i18n.t('normal')}</TextIranSans>
                        <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{convertDigit(commafy(item.price),"e2p")}</TextIranSans>
                    </View>
                </TouchableHighlight>}
                    {item.price_with_rent_bicycle && <TouchableHighlight onPress={()=>{if(this.checkLogin()){this.getOrderId(item.id,"rent")}else{this.props.navigation.navigate('Login')}}} style={[globalStyles.flex1,,globalStyles.buttonSuccess,globalStyles.button]}>
                        <View>
                            <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{i18n.t('with_rent_bicycle')}</TextIranSans>
                            <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{convertDigit(commafy(item.price_with_rent_bicycle),"e2p")}</TextIranSans>
                        </View>
                    </TouchableHighlight>}</View>
                <View style={[globalStyles.flexRow]}>{item.price_with_essentials && <TouchableHighlight onPress={()=>{if(this.checkLogin()){this.getOrderId(item.id,"essential")}else{this.props.navigation.navigate('Login')}}} style={[globalStyles.flex1,globalStyles.buttonSuccess,globalStyles.button]}>
                    <View>
                        <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{i18n.t('with_rent_bicycle_and_essentials')}</TextIranSans>
                        <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{convertDigit(commafy(item.price_with_essentials),"e2p")}</TextIranSans>
                    </View>
                </TouchableHighlight>}</View>


                <View style={[globalStyles.flexRow]}>{item.price_single_bed_room && <TouchableHighlight onPress={()=>{if(this.checkLogin()){this.getOrderId(item.id,"single")}else{this.props.navigation.navigate('Login')}}} style={[globalStyles.flex1,globalStyles.buttonSuccess,globalStyles.button]}>
                    <View>
                        <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{i18n.t('with_single_bed_room')}</TextIranSans>
                        <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{convertDigit(commafy(item.price_single_bed_room),"e2p")}</TextIranSans>
                    </View>
                </TouchableHighlight>}
                    {item.price_double_bed_room && <TouchableHighlight onPress={()=>{if(this.checkLogin()){this.getOrderId(item.id,"double")}else{this.props.navigation.navigate('Login')}}} style={[globalStyles.flex1,,globalStyles.buttonSuccess,globalStyles.button]}>
                        <View>
                            <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{i18n.t('with_double_bed_room')}</TextIranSans>
                            <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{convertDigit(commafy(item.price_double_bed_room),"e2p")}</TextIranSans>
                        </View>
                    </TouchableHighlight>}
                </View>
                {item.price_three_bed_room && <TouchableHighlight onPress={()=>{if(this.checkLogin()){this.getOrderId(item.id,"triple")}else{this.props.navigation.navigate('Login')}}} style={[globalStyles.flex1,,globalStyles.buttonSuccess,globalStyles.button]}>
                    <View>
                        <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{i18n.t('with_triple_bed_room')}</TextIranSans>
                        <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{convertDigit(commafy(item.price_three_bed_room),"e2p")}</TextIranSans>
                    </View>
                </TouchableHighlight>}
                {item.price_four_bed_room && <TouchableHighlight onPress={()=>{if(this.checkLogin()){this.getOrderId(item.id,"quadruple")}else{this.props.navigation.navigate('Login')}}} style={[globalStyles.flex1,,globalStyles.buttonSuccess,globalStyles.button]}>
                    <View>
                        <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{i18n.t('with_quadruple_bed_room')}</TextIranSans>
                        <TextIranSans style={[globalStyles.buttonLabel,globalStyles.buttonLabelWhite]}>{convertDigit(commafy(item.price_four_bed_room),"e2p")}</TextIranSans>
                    </View>
                </TouchableHighlight>}
            </View>
        )
    }
    render() {

        if(this.state.isLoading){
            return(
                <SafeAreaView style={{flex: 1, padding: 20}}>
                    <View><ActivityIndicator/></View>
                </SafeAreaView>
            )
        }

        return(
            <SafeAreaView>
                <ScrollView horizontal={true}>
                {this.state.items.map(item =>
                    <View key={item.id} style={[TourStyles.item,this.state.items.length>1?{width: windowWidth - 40}:{width: windowWidth - 20}]}>
                        <TourItem data={item}/>
                        {this.renderTourPriceBtnContainer(item)}
                    </View>
                )}
                </ScrollView>
            </SafeAreaView>
        );
    }

}


export default connect(mapStateToProps)(index);
