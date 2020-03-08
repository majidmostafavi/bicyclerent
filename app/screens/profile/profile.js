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
    Text, TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../components/I18n';
import {connect} from "react-redux";
import Button from "../../components/Button";
import {setUser} from "../../redux/actions";
import TextIranSans from "../../components/TextIranSans";
import {globalStyles} from "../../styles";
import RequestServer from "../../components/api/request-server";
import {commafy, convertDigit} from "../../components/helpers";
import Icons from 'react-native-vector-icons/Ionicons';


const mapStateToProps = (state) => {
    let user = state.user;
    let settings = state.settings;
    return {user, settings};
};
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        // setLang: (lang) => dispatch(setLang(lang))
    };
};

class index extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            user: {...this.props.user},
            userUpdate: false
        }
    }

    logout() {
        this.props.setUser(null);
        AsyncStorage.removeItem('user');
    }

    updateProfile() {
        let params = this.state.user;
        RequestServer('profile',
            {
                method: 'POST',
                data: params
            })
            .then((response) => response.json())
            .then((user) => {
                this.props.setUser(user);
                this.setState({
                    user: user,
                    userUpdate: true
                })
            })
    }

    renderProfile() {

            return (
                <View style={[{marginTop: 10}]}>
                    {!this.props.user.presenter &&
                    <View><TextIranSans style={[globalStyles.textCenter]}>۱۵۰۰۰ تومان اعتبار خرید تور با تکمیل حساب
                        کاربری از باچرخ دریافت کنید</TextIranSans></View>}
                    {!!this.props.user.presenter && this.props.user.trabon > 0 && <View><TextIranSans
                        style={[globalStyles.textCenter]}>شما {convertDigit(commafy(this.props.user.trabon), 'e2p')}تومان
                        اعتبار هدیه دارید <Icons
                            name={'ios-happy'}
                            size={20}
                            color={"#fafafa"}/></TextIranSans></View>}

                    {/*<View><TextIranSans>{i18n.t('language')} : {i18n.t(this.props.settings.locale)}</TextIranSans></View>*/}
                    <View style={[]}><TextIranSans style={[]}>{i18n.t('first_name')}</TextIranSans><TextInput
                        onChangeText={(first_name_fa) => this.setState(state => (state.user.first_name_fa = first_name_fa))}
                        style={[globalStyles.input]}
                        placeholder={i18n.t('first_name')}
                        underlineColorAndroid={'transparent'}
                        value={this.state.user.first_name_fa}
                        editable={!this.props.user.first_name_fa}
                        selectTextOnFocus={!this.props.user.first_name_fa}
                    /></View>
                    <View style={[]}><TextIranSans style={[]}>{i18n.t('last_name')}</TextIranSans><TextInput
                        onChangeText={(last_name_fa) => this.setState(state => (state.user.last_name_fa = last_name_fa))}
                        style={[globalStyles.input]}
                        placeholder={i18n.t('last_name')}
                        underlineColorAndroid={'transparent'}
                        value={this.state.user.last_name_fa}
                        editable={!this.props.user.last_name_fa}
                        selectTextOnFocus={!this.props.user.last_name_fa}
                    /></View>
                    {!this.props.user.presenter &&
                    <View style={[]}><TextIranSans style={[]}>{i18n.t('presenter')}</TextIranSans><TextInput
                        onChangeText={(presenter) => this.setState(state => (state.user.presenter = presenter))}
                        style={[globalStyles.input]}
                        placeholder={i18n.t('presenter')}
                        underlineColorAndroid={'transparent'}
                        value={this.state.user.presenter}
                        editable={!this.props.user.presenter}
                        selectTextOnFocus={!this.props.user.presenter}
                    /></View>}
                    <View style={[]}><TextIranSans style={[]}>{i18n.t('email')}</TextIranSans><TextInput
                        onChangeText={(email) => this.setState(state => (state.user.email = email))}
                        style={[globalStyles.input]}
                        placeholder={i18n.t('email')}
                        underlineColorAndroid={'transparent'}
                        value={this.state.user.email}
                    /></View>
                    <TextIranSans>{i18n.t('biography')}</TextIranSans>

                    <TextInput
                        onChangeText={(biography) => this.setState(state => (state.user.biography = biography))}
                        style={[globalStyles.input, globalStyles.textIranSans]}
                        placeholder={i18n.t('biography')}
                        multiline={true}
                        numberOfLines={6}
                        underlineColorAndroid={'transparent'}
                        value={this.state.user.biography}
                    />
                    <View style={[{marginTop: 10}]}><TextIranSans>نام، نام خانوادگی و بیوگرافی فقط یکبار قابل ویرایش
                        هستند</TextIranSans></View>
                    {this.state.userUpdate && <View style={[{marginTop: 40}]}>
                        <View style={[{backgroundColor: "#d4edda", padding: 20}]}><TextIranSans
                            style={[globalStyles.textCenter, {color: "#155724"}]}>درخواست شما با موفقیت انجام
                            شد.</TextIranSans></View>

                    </View>}
                    <View style={[globalStyles.flexRow, {marginTop: 20}]}>
                        <View style={[globalStyles.flex1]}>
                            <Button style={[globalStyles.buttonDefault]} textStyle={globalStyles.buttonLabelDanger}
                                    onPress={() => {
                                        this.logout()
                                    }}>{i18n.t('logout')}</Button>
                        </View>
                        <View style={[globalStyles.flex1]}>
                            <Button style={[globalStyles.buttonSuccess]} textStyle={globalStyles.buttonLabelWhite}
                                    onPress={() => {
                                        this.updateProfile()
                                    }}>{i18n.t('update')}</Button>
                        </View>
                    </View>
                </View>
            )

    }

    render() {
        let isLoggedIn = Object.keys(this.props.user).length > 0 ? true : false;
        if (isLoggedIn) {
        return (
            <ScrollView style={{padding: 10}}
                        contentInsetAdjustmentBehavior="automatic">
                {this.renderProfile()}
            </ScrollView>
        );
        } else {
            return (
                <View style={[{flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'}]}>
                    <View style={{width:"75%"}}>
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <TextIranSans style={[globalStyles.textCenter, {fontSize: 16}]}>۱۵۰۰۰ تومان هدیه خرید
                                تور</TextIranSans><TextIranSans style={[globalStyles.textCenter, {fontSize: 16}]}>با
                            عضویت و تکمیل حساب کاربری </TextIranSans>
                        </View>
                        <View>
                            <Button style={[globalStyles.buttonSuccess]} textStyle={globalStyles.buttonLabelWhite}
                                    onPress={() => this.props.navigation.navigate('Login')}>{i18n.t('login')}</Button>
                        </View>
                    </View>
                </View>)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index);

