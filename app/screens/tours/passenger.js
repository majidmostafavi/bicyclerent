import React, {Component} from 'react';
import {
    View,
    ScrollView, SafeAreaView,
    TextInput,
    TouchableHighlight,
    ActivityIndicator, Image,
    KeyboardAvoidingView
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

class passenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            passengerInfos: {
                passengers: [{
                    first_name_fa: '',
                    last_name_fa: '',
                    national_code: 0,
                    birth_date_day: 0,
                    birth_date_month: 0,
                    birth_date_year: 0,
                    mobile: 0
                }]
            },
            errorMsg: ''
        };
    }

    componentDidMount() {
        RequestServer(`tours/order/${this.props.navigation.state.params.order_id}`, {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                let order = responseJson;
                let passengerCountLock = false;
                let passengerInfos = {};
                if (order.tour_type == 'single') {
                    passengerCountLock = true;
                    passengerInfos = {
                        passengers: [{
                            first_name_fa: '',
                            last_name_fa: '',
                            national_code: 0,
                            birth_date_day: 0,
                            birth_date_month: 0,
                            birth_date_year: 0,
                            mobile: 0
                        }]
                    }
                }
                if (order.tour_type == 'double') {
                    passengerCountLock = true;
                    passengerInfos = {
                        passengers: [{
                            first_name_fa: '',
                            last_name_fa: '',
                            national_code: 0,
                            birth_date_day: 0,
                            birth_date_month: 0,
                            birth_date_year: 0,
                            mobile: 0
                        }, {
                            first_name_fa: '',
                            last_name_fa: '',
                            national_code: 0,
                            birth_date_day: 0,
                            birth_date_month: 0,
                            birth_date_year: 0,
                            mobile: 0
                        }]
                    }
                }
                if (order.tour_type == 'triple') {
                    passengerCountLock = true;
                    passengerInfos = {
                        passengers: [{
                            first_name_fa: '',
                            last_name_fa: '',
                            national_code: 0,
                            birth_date_day: 0,
                            birth_date_month: 0,
                            birth_date_year: 0,
                            mobile: 0
                        },
                            {
                                first_name_fa: '',
                                last_name_fa: '',
                                national_code: 0,
                                birth_date_day: 0,
                                birth_date_month: 0,
                                birth_date_year: 0,
                                mobile: 0
                            },
                            {
                                first_name_fa: '',
                                last_name_fa: '',
                                national_code: 0,
                                birth_date_day: 0,
                                birth_date_month: 0,
                                birth_date_year: 0,
                                mobile: 0
                            }]
                    }
                }
                if (order.tour_type == 'quadruple') {
                    passengerCountLock = true;
                    passengerInfos = {
                        passengers: [{
                            first_name_fa: '',
                            last_name_fa: '',
                            national_code: 0,
                            birth_date_day: 0,
                            birth_date_month: 0,
                            birth_date_year: 0,
                            mobile: 0
                        },
                            {
                                first_name_fa: '',
                                last_name_fa: '',
                                national_code: 0,
                                birth_date_day: 0,
                                birth_date_month: 0,
                                birth_date_year: 0,
                                mobile: 0
                            },
                            {
                                first_name_fa: '',
                                last_name_fa: '',
                                national_code: 0,
                                birth_date_day: 0,
                                birth_date_month: 0,
                                birth_date_year: 0,
                                mobile: 0
                            },
                            {
                                first_name_fa: '',
                                last_name_fa: '',
                                national_code: 0,
                                birth_date_day: 0,
                                birth_date_month: 0,
                                birth_date_year: 0,
                                mobile: 0
                            }]
                    }
                }
                this.setState({
                    isLoading: false,
                    order,
                    passengerCountLock,
                    passengerInfos
                });

            })
            .catch((error) => {

            })
    }

    order() {
        this.setState({errorMsg: ""});
        let hasEmpty = false;
        if (!this.state.passengerInfos.city || !this.state.passengerInfos.phone_number || !this.state.passengerInfos.address) {
            hasEmpty = true;
        }
        this.state.passengerInfos.passengers.forEach((passenger) => {
            if (!passenger.first_name_fa || !passenger.last_name_fa || !passenger.national_code || !passenger.birth_date_day || !passenger.birth_date_month || !passenger.birth_date_year || !passenger.mobile) {
                hasEmpty = true;
            }
        });
        if (hasEmpty) {
            this.setState({errorMsg: "لطفا تمامی موارد را پر کنید"});
            return;
        }
        let params = {
            passengerInfos: this.state.passengerInfos
        };
        RequestServer('tours/order/reserve/' + this.state.order.id,
            {
                method: 'POST',
                data: params
            })
            .then((response) => response.json())
            .then((order) => {
                this.props.navigation.navigate('reserve', {order_id: order.id});
            }).catch((e)=>{
                console.log(params);
                console.log(e);
            this.setState({errorMsg: "خطا! لطفا دوباره تلاش کنید"});
        })
    }

    addPassenger() {
        this.setState(state => (state.passengerInfos.passengers.push({
            first_name_fa: '',
            last_name_fa: '',
            national_code: 0,
            birth_date_day: 0,
            birth_date_month: 0,
            birth_date_year: 0,
            mobile: 0
        })))
    }

    removePassenger() {
        if (this.state.passengerInfos.passengers.length > 1) {
            this.setState(state => (state.passengerInfos.passengers.pop()))
        }
    }

    renderTourSummery(tourDetail, orderTourType) {
        let price = 0;
        if (orderTourType == "normal") {
            price = tourDetail.price;
        } else if (orderTourType == "rent") {
            price = tourDetail.price_with_rent_bicycle;
        } else if (orderTourType == "essential") {
            price = tourDetail.price_with_essentials;
        } else if (orderTourType == "single") {
            price = tourDetail.price_single_bed_room;
        } else if (orderTourType == "double") {
            price = tourDetail.price_double_bed_room;
        } else if (orderTourType == "triple") {
            price = tourDetail.price_three_bed_room;
        } else if (orderTourType == "quadruple") {
            price = tourDetail.price_four_bed_room;
        }

        return (
            <View style={TourStyles.orderTourSummery}>
                {/*<TourItem data={tourDetail}/>*/}
                <View style={globalStyles.flexRow}><TextIranSans
                    style={TourStyles.name}>{i18n.t('source')} :</TextIranSans><TextIranSans
                    style={TourStyles.value}>{tourDetail.source_city}</TextIranSans></View>
                <View style={globalStyles.flexRow}><TextIranSans
                    style={TourStyles.name}>{i18n.t('destination')} :</TextIranSans><TextIranSans
                    style={TourStyles.value}>{tourDetail.destination_city}</TextIranSans></View>
                <View style={globalStyles.flexRow}><TextIranSans
                    style={TourStyles.name}>{i18n.t('start_date')} :</TextIranSans><TextIranSans
                    style={TourStyles.value}>{convertDigit(moment(tourDetail.start_date).locale(this.props.settings.locale).format('YYYY/MM/DD'), 'e2p')}</TextIranSans></View>
                <View style={globalStyles.flexRow}><TextIranSans
                    style={TourStyles.name}>{i18n.t('end_date')} :</TextIranSans><TextIranSans
                    style={TourStyles.value}>{convertDigit(moment(tourDetail.end_date).locale(this.props.settings.locale).format('YYYY/MM/DD'), 'e2p')}</TextIranSans></View>
                <View style={globalStyles.flexRow}><TextIranSans
                    style={TourStyles.name}>{i18n.t('category')} :</TextIranSans><TextIranSans
                    style={TourStyles.value}>{i18n.t(tourDetail.category)}</TextIranSans></View>
                <View style={globalStyles.flexRow}><TextIranSans
                    style={TourStyles.name}>{i18n.t('price_per_person')} :</TextIranSans><TextIranSans
                    style={TourStyles.value}>{convertDigit(commafy(price), 'e2p')} {i18n.t('toman')}</TextIranSans></View>
            </View>
        )
    }

    renderPassengerForm() {


        return (
            <View style={TourStyles.orderFormHolder}>
                <TextIranSans style={[{paddingRight: 10}]}>{i18n.t('location_city')}</TextIranSans>
                <TextInput
                    onChangeText={(city) => this.setState(state => (state.passengerInfos.city = city))}
                    style={[globalStyles.input, TourStyles.orderFormInput]}
                    placeholder={i18n.t('location_city')}
                    underlineColorAndroid={'transparent'}
                    value={this.state.passengerInfos.city}
                />
                <TextIranSans style={[{paddingRight: 10}]}>{i18n.t("phone_number")}</TextIranSans>
                <TextInput
                    onChangeText={(phone_number) => this.setState(state => (state.passengerInfos.phone_number = phone_number))}
                    style={[globalStyles.input, TourStyles.orderFormInput]}
                    placeholder={i18n.t("phone_number")}
                    underlineColorAndroid={'transparent'}
                    keyboardType={"numeric"}
                    maxLength={11}
                    value={this.state.passengerInfos.phone_number}
                />
                <TextIranSans style={[{paddingRight: 10}]}>{i18n.t("sickness")}</TextIranSans>
                <TextInput
                    onChangeText={(sickness) => this.setState(state => (state.passengerInfos.sickness = sickness))}
                    style={[globalStyles.input, TourStyles.orderFormInput]}
                    placeholder={i18n.t("sickness")}
                    underlineColorAndroid={'transparent'}
                    value={this.state.passengerInfos.sickness}
                />
                <TextIranSans style={[{paddingRight: 10}]}>{i18n.t('address')}</TextIranSans>

                <TextInput
                    onChangeText={(address) => this.setState(state => (state.passengerInfos.address = address))}
                    style={[globalStyles.input, TourStyles.orderFormInput]}
                    placeholder={i18n.t('address')}
                    multiline={true}
                    numberOfLines={4}
                    underlineColorAndroid={'transparent'}
                    value={this.state.passengerInfos.address}
                />
                {this.state.passengerInfos.passengers.map((passengers, index) => {
                    const days = ['first', 'second', 'third', 'forth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
                    return (<View>
                        <TextIranSans
                            style={globalStyles.buttonLabel}>{i18n.t('passenger')} {i18n.t(days[index])}</TextIranSans>
                        <TextIranSans style={[{paddingRight: 10}]}>{i18n.t('first_name')}</TextIranSans>
                        <TextInput
                            onChangeText={(first_name_fa) => this.setState(state => (state.passengerInfos.passengers[index].first_name_fa = first_name_fa))}
                            style={[globalStyles.input, TourStyles.orderFormInput]}
                            placeholder={i18n.t('first_name')}
                            underlineColorAndroid={'transparent'}
                            value={this.state.passengerInfos.passengers[index].first_name_fa}
                        />
                        <TextIranSans style={[{paddingRight: 10}]}>{i18n.t('last_name')}</TextIranSans>
                        <TextInput
                            onChangeText={(last_name_fa) => this.setState(state => (state.passengerInfos.passengers[index].last_name_fa = last_name_fa))}
                            style={[globalStyles.input, TourStyles.orderFormInput]}
                            placeholder={i18n.t('last_name')}
                            underlineColorAndroid={'transparent'}
                            value={this.state.passengerInfos.passengers[index].last_name_fa}
                        />
                        <TextIranSans style={[{paddingRight: 10}]}>{i18n.t('national_code')}</TextIranSans>
                        <TextInput
                            onChangeText={(national_code) => this.setState(state => (state.passengerInfos.passengers[index].national_code = national_code))}
                            style={[globalStyles.input, TourStyles.orderFormInput]}
                            placeholder={i18n.t('national_code')}
                            underlineColorAndroid={'transparent'}
                            keyboardType={"numeric"}
                            maxLength={10}
                            value={this.state.passengerInfos.passengers[index].national_code}
                        />
                        <TextIranSans style={[{paddingRight: 10}]}>{i18n.t('birth_date')}</TextIranSans>
                        <View style={globalStyles.flexRow}>
                            <TextInput
                                onChangeText={(birth_date_day) => this.setState(state => (state.passengerInfos.passengers[index].birth_date_day = birth_date_day))}
                                style={[globalStyles.input, TourStyles.orderFormInput, {flex: 1}]}
                                placeholder={i18n.t('day')}
                                underlineColorAndroid={'transparent'}
                                keyboardType={"numeric"}
                                maxLength={2}
                                value={this.state.passengerInfos.passengers[index].birth_date_day}
                            />
                            <TextInput
                                onChangeText={(birth_date_month) => this.setState(state => (state.passengerInfos.passengers[index].birth_date_month = birth_date_month))}
                                style={[globalStyles.input, TourStyles.orderFormInput, {flex: 1}]}
                                placeholder={i18n.t('month')}
                                underlineColorAndroid={'transparent'}
                                keyboardType={"numeric"}
                                maxLength={2}
                                value={this.state.passengerInfos.passengers[index].birth_date_month}
                            />
                            <TextInput
                                onChangeText={(birth_date_year) => this.setState(state => (state.passengerInfos.passengers[index].birth_date_year = birth_date_year))}
                                style={[globalStyles.input, TourStyles.orderFormInput, {flex: 2}]}
                                placeholder={i18n.t('year')}
                                underlineColorAndroid={'transparent'}
                                keyboardType={"numeric"}
                                maxLength={4}
                                value={this.state.passengerInfos.passengers[index].birth_date_year}
                            />
                        </View>
                        <TextIranSans style={[{paddingRight: 10}]}>{i18n.t('mobile')}</TextIranSans>
                        <TextInput
                            onChangeText={(mobile) => this.setState(state => (state.passengerInfos.passengers[index].mobile = mobile))}
                            style={[globalStyles.input, TourStyles.orderFormInput]}
                            placeholder={i18n.t('mobile')}
                            underlineColorAndroid={'transparent'}
                            keyboardType={"numeric"}
                            maxLength={11}
                            value={this.state.passengerInfos.passengers[index].mobile}
                        />

                    </View>)
                })}
                {!this.state.passengerCountLock && <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight onPress={() => {
                        this.removePassenger()
                    }} style={TourStyles.orderRemoveBtn}>
                        <View>
                            <Icons
                                name={'ios-remove'}
                                size={20}
                                color={"#fafafa"}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {
                        this.addPassenger()
                    }} style={TourStyles.orderAddBtn}>
                        <View>
                            <Icons
                                name={'ios-add'}
                                size={20}
                                color={"#fafafa"}/>
                        </View>
                    </TouchableHighlight>

                </View>}
                {!!this.state.errorMsg && <View style={[{marginTop: 40}]}>
                    <View style={[{
                        backgroundColor: "#f8d7da",
                        padding: 20,
                        borderColor: "#f5c6cb",
                        borderWidth: .5,
                        borderRadius: 3
                    }]}><TextIranSans style={[globalStyles.textCenter, {color: "#721c24"}]}>{this.state.errorMsg}</TextIranSans></View>

                </View>}
                <View style={[globalStyles.flexRow]}>
                    <View style={[globalStyles.flex1]}>
                        <Button style={[globalStyles.buttonDefault, globalStyles.flex1]} onPress={() => {
                            this.props.navigation.goBack()
                        }}>{i18n.t('back')}</Button>
                    </View>
                    <View style={[globalStyles.flex1]}>
                        <Button style={[globalStyles.buttonSuccess, globalStyles.flex1]}
                                textStyle={globalStyles.buttonLabelWhite} onPress={() => {
                            this.order()
                        }}>{i18n.t('order')}</Button>
                    </View>
                </View>
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
            <SafeAreaView style={{flex: 1}}>
                <KeyboardAvoidingView behavior={null} enabled>
                    <ScrollView>
                        {this.renderTourSummery(this.state.order.tour, this.state.order.tour_type)}
                        {this.renderPassengerForm()}
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    };
}

export default connect(mapStateToProps)(passenger);