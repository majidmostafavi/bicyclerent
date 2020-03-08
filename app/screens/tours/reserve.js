import React, {Component} from 'react';
import {
    View,
    ScrollView, SafeAreaView,
    TextInput,
    TouchableHighlight,
    ActivityIndicator, Image,
    Linking
} from 'react-native';
import {connect} from "react-redux";
import TourItem from '../../components/tours/details';
import i18n from '../../components/I18n';
import {globalStyles, TourStyles} from '../../styles';
import TextIranSans from "../../components/TextIranSans";
import RequestServer from "../../components/api/request-server";
import Icons from 'react-native-vector-icons/Ionicons';
import moment from "jalali-moment";
import {commafy, convertDigit} from "../../components/helpers";
import Button from "../../components/Button";

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
        user: state.user
    };
};

class reserve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        const order_id = this.props.navigation.state.params.order_id;
        RequestServer(`tours/order/${order_id}`, {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    order: responseJson,
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    pay() {
        // console.log(this.state.order.id);
        const url = "https://www.bacharkh.com/api/tours/order/pay/" + this.state.order.id;
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }

    renderPassengerSummery() {
        return (
            <View>
                <View style={globalStyles.boxTitle}><TextIranSans
                    style={[globalStyles.textCenter]}>{i18n.t('passengers_name')}</TextIranSans></View>
                {
                    this.state.order.passengers.map((passenger) => {
                        return (
                            <View style={[globalStyles.flexRow, {paddingTop: 10, paddingBottom: 10}]}>
                                <TextIranSans
                                    style={globalStyles.flex1}>{passenger.first_name_fa}</TextIranSans><TextIranSans
                                style={globalStyles.flex1}> {passenger.last_name_fa}</TextIranSans>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    renderOrderSummery() {
        return (
            <View>
                <View style={globalStyles.boxTitle}><TextIranSans
                    style={[globalStyles.textCenter]}>{i18n.t('tour_summery')}</TextIranSans></View>
                <View style={[globalStyles.flexRow, {paddingTop: 10, paddingBottom: 10}]}><TextIranSans
                    style={globalStyles.flex1}>{i18n.t('source')} :</TextIranSans><TextIranSans
                    style={globalStyles.flex1}>{this.state.order.tour.source_city}</TextIranSans></View>
                <View style={[globalStyles.flexRow, {paddingTop: 10, paddingBottom: 10}]}><TextIranSans
                    style={globalStyles.flex1}>{i18n.t('destination')} :</TextIranSans><TextIranSans
                    style={globalStyles.flex1}>{this.state.order.tour.destination_city}</TextIranSans></View>
                <View style={[globalStyles.flexRow, {paddingTop: 10, paddingBottom: 10}]}><TextIranSans
                    style={globalStyles.flex1}>{i18n.t('start_date')} :</TextIranSans><TextIranSans
                    style={globalStyles.flex1}>{convertDigit(moment(this.state.order.tour.start_date).locale(this.props.settings.locale).format('YYYY/MM/DD'), 'e2p')}</TextIranSans></View>
                <View style={[globalStyles.flexRow, {paddingTop: 10, paddingBottom: 10}]}><TextIranSans
                    style={globalStyles.flex1}>{i18n.t('end_date')} :</TextIranSans><TextIranSans
                    style={globalStyles.flex1}>{convertDigit(moment(this.state.order.tour.end_date).locale(this.props.settings.locale).format('YYYY/MM/DD'), 'e2p')}</TextIranSans></View>
                <View style={[globalStyles.flexRow, {paddingTop: 10, paddingBottom: 10}]}><TextIranSans
                    style={globalStyles.flex1}>{i18n.t('category')} :</TextIranSans><TextIranSans
                    style={globalStyles.flex1}>{i18n.t(this.state.order.tour.category)}</TextIranSans></View>
                <View style={[globalStyles.flexRow, {paddingTop: 10, paddingBottom: 10}]}><TextIranSans
                    style={globalStyles.flex1}>{i18n.t('price_per_person')} :</TextIranSans><TextIranSans
                    style={globalStyles.flex1}>{convertDigit(commafy(this.state.order.sale_price), 'e2p')} {i18n.t('toman')}</TextIranSans></View>
            </View>
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <SafeAreaView style={{flex: 1, padding: 20}}>
                    <View><ActivityIndicator/></View>
                </SafeAreaView>
            )
        }
        return (
            <SafeAreaView style={{flex: 1, padding: 20}}>
                <ScrollView>
                    {this.renderPassengerSummery()}
                    {this.renderOrderSummery()}
                    <View style={[globalStyles.flexRow]}>
                        <View style={[globalStyles.flex1]}>
                            <Button style={[globalStyles.buttonDefault, globalStyles.button, globalStyles.flex1]}
                                    onPress={() => {
                                        this.props.navigation.goBack()
                                    }}>{i18n.t('back')}</Button>
                        </View>
                        <View style={[globalStyles.flex1]}>

                            <Button style={[globalStyles.buttonSuccess, globalStyles.button, globalStyles.flex1]}
                                    textStyle={globalStyles.buttonLabelWhite} onPress={() => {
                                this.pay()
                            }}> <Icons
                                name={'ios-lock'}
                                size={20}
                                color={"#fafafa"}/> {i18n.t('pay')}</Button>
                        </View>
                    </View>
                </ScrollView>

            </SafeAreaView>
        )
    };
}

export default connect(mapStateToProps)(reserve);