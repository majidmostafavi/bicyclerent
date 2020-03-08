import React, {Component} from 'react';
import {
    Animated,
    ActivityIndicator,
    Easing,
    StyleSheet,
    ScrollView,
    View,
    Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TextIranSans from "../components/TextIranSans";
import Input from "../components/Input";
import Button from "../components/Button";
import {globalStyles} from '../styles';
import TransparentModal from "../components/modal/TransparentModal";
import {RequestServer} from "../components/api/request-server";
import {connect} from "react-redux";
import {setUser} from "../redux/actions";
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';

const checkEdit = (<MaterialIcon name="check-circle" size={55} style={{color: "#1abc9c"}}/>);

const mapStateToProps = (state) => {
    let user = state.user;
    return {user};
};
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    };
};

let todoFunction = null;
let globalRef;

export const ifLoggedIn = (callBackFunction) => {
    AsyncStorage.getItem('user')
        .then(userObject => {
            if (userObject !== null) {
                try {
                    callBackFunction();

                } catch (exp) {
                    console.log('exception: ' + exp);
                }
            } else { // user is null
                globalRef.setState({'forceLogin': true});
                showLoginModal(callBackFunction)
            }
        })
        .catch(err => {
            console.log('err => ' + err);
        });
}

export const showLoginModal = (callBackFunction) => {
    globalRef.show(callBackFunction)
}


class LoginModal extends Component {
    constructor(props) {
        super(props);

        globalRef = this;

        this.state = {
            selectedTab: 0,
            mobile: '',
            givenPassword: '',
            message: '',
            enterMode: true,
            forceLogin: false,
        };

        this.screenWidth = Dimensions.get('screen').width;
        this.borderRadius = new Animated.Value(3);
        this.width = new Animated.Value(95);
    }

    show(callBackFunction) {
        todoFunction = callBackFunction;

        this.setState({'message': '','selectedTab': 0,'mobile': '','givenPassword': '','enterMode': true});
        // this.modalTest.show();
    };

    hide() {
        this.setState({'message': '', 'forceLogin': false});
        this.props.navigation.popToTop();
    };

    changeTab(tab) {
        this.setState({'selectedTab': tab});
    }

    phoneValidation() {
        if (this.state.mobile.toString().length !== 11 || this.state.mobile.toString().substr(0, 2) !== '09') {
            this.setState({'message': 'شماره موبایل نادرست است'});
            return;
        } else {
            this.setState({'message': ''});
        }

        this.setState({'enterMode': false});

        Animated.parallel([
            Animated.timing(
                this.borderRadius,
                {
                    toValue: 50,
                    easing: Easing.bezier(.39, .12, .22, .99),
                    duration: 1000,
                }
            ).start(),
            Animated.timing(
                this.width,
                {
                    toValue: 38,
                    easing: Easing.bezier(.39, .12, .22, .99),
                    duration: 1000,
                }
            ).start(),

        ]);

        RequestServer('login', {
            method: 'POST',
            data: {
                mobile: this.state.mobile.toString(),
                password: this.state.givenPassword.toString(),
            }
        })
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'smsPassword') {
                    this.changeTab(1)
                } else if (responseJson.status === 'login') {
                    AsyncStorage.setItem('user', JSON.stringify(responseJson));
                    this.props.setUser(responseJson);
                    this.changeTab(2);
                } else if (this.state.givenPassword !== '' && responseJson.status == 'failed') { // wrong password
                    this.setState({'message': 'کد نادرست وارد شده است!'});
                } else { // fail
                    this.changeTab(0);
                    this.setState({'message': 'خطا! لطفا دوباره تلاش کنید'});
                }
            })
            .catch((err) => {
                this.setState({'message': 'خطا! لطفا دوباره تلاش کنید'});
            })
            .finally(() => {
                Animated.timing(this.borderRadius, {toValue: 3, duration: 0}).start();
                Animated.timing(this.width, {toValue: 95, duration: 0}).start();
                this.setState({'enterMode': true})
            });
    }

    back() {
        this.setState({'enterMode': true});
        this.changeTab(0)
    }

    todo() {
        this.changeTab(0);
        this.hide();
        this.changeTab(0);
        if (todoFunction)
            todoFunction();
    }

    render() {
        let borderRadius = this.borderRadius;
        let width = this.width.interpolate({
            inputRange: [50, 95],
            outputRange: ['50%', '95%']
        });


        return (
            <TransparentModal >
                <TextIranSans style={{backgroundColor: '#38ada9', padding: 10, color: "#fff"}}>ورود به
                    باچرخ</TextIranSans>

                <ScrollView keyboardShouldPersistTaps='handled' ref={(ref) => {
                    this.scrollView = ref
                }}>
                    <View style={styles.mainView}>
                        {this.state.message.length > 0 &&
                        <TextIranSans
                            style={{color: '#9f1816', textAlign: 'center'}}>{this.state.message}</TextIranSans>
                        }
                        {!!this.state.forceLogin &&
                        <TextIranSans style={{
                            color: '#9f1816',
                            textAlign: 'center',
                            fontSize: 12,
                        }}>{"برای مشاهده این قسمت وارد حساب کاربری خود شوید"}</TextIranSans>}
                        <View >
                            {this.state.selectedTab === 0 &&
                            <View >
                                <TextIranSans style={{marginBottom: 10}}>{'لطفا شماره موبایل خود را وارد کنید'}</TextIranSans>
                                <Input
                                    keyboardType="phone-pad"
                                    maxLength={11}
                                    placeholder="09..."
                                    value={this.state.mobile}
                                    onChangeText={(mobile) => {
                                        this.scrollView.scrollToEnd();
                                        this.setState({mobile})
                                    }}
                                />
                                <View style={[globalStyles.flexRow]}>
                                    <View style={globalStyles.flex1}>
                                        <Button style={[globalStyles.flex1,globalStyles.buttonDefault]} textStyle={{color: "#666"}}
                                                 onPress={() => this.hide()}>انصراف</Button>
                                    </View>
                                    <View style={globalStyles.flex1}>
                                        <Button style={[globalStyles.buttonSuccess]} textStyle={globalStyles.buttonLabelWhite}
                                               onPress={() => this.phoneValidation()}>
                                        {!!this.state.enterMode ?
                                            "ورود"
                                            : "منتظر بمانید"

                                        }
                                    </Button>
                                    </View>
                                </View>
                            </View>}

                            {this.state.selectedTab === 1 &&
                            <View >
                                <View style={{width: '100%'}}><TextIranSans style={{
                                    backgroundColor: '#d9edf6',
                                    padding: 10,
                                    marginBottom: 10,
                                }}>{'کد تایید به شماره موبایل ' + this.state.mobile + ' ارسال شد. کد تایید را در کادر زیر وارد کنید'}</TextIranSans></View>
                                <Input value={this.state.givenPassword} keyboardType="numeric"
                                        onChangeText={(givenPassword) => {
                                            this.scrollView.scrollToEnd();
                                            this.setState({givenPassword})
                                        }}/>
                                <View style={globalStyles.flexRow}>
                                    <View style={globalStyles.flex1}>
                                        <Button style={[globalStyles.buttonDefault]} textStyle={{color: "#666"}}
                                                onPress={() => this.back()}>بازگشت</Button>
                                    </View>
                                    <View style={{width: 10}}/>

                                    <View style={[globalStyles.flex1]}>
                                        <Button style={[globalStyles.buttonSuccess]} textStyle={globalStyles.buttonLabelWhite} onPress={() => {
                                            if (this.state.givenPassword !== '')
                                                this.phoneValidation();
                                            else
                                                this.setState({'message': 'کد ارسال شده را وارد کنید'})
                                        }}>
                                        {!!this.state.enterMode ?
                                            "ورود"
                                            : "منتظر بمانید"
                                        }
                                    </Button>
                                    </View>
                                </View>
                            </View>}

                            {this.state.selectedTab === 2 &&
                            <View >
                                <View style={styles.iconContainer}>
                                    {checkEdit}
                                </View>
                                <View style={{height: 50, marginTop: 10, alignItems: 'center'}}><TextIranSans style={{
                                    padding: 10
                                }}>کاربر گرامی خوش آمدید.</TextIranSans></View>

                                    <View>
                                        <Button style={[globalStyles.buttonDefault]} textStyle={{color: "#666"}}
                                                 onPress={() => this.todo()}>ادامه</Button>
                                    </View>

                            </View>}
                        </View>
                    </View>
                </ScrollView>
            </TransparentModal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(LoginModal);


const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        padding: 10,
        // height: 250,
    },

    buttonContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        paddingTop: 20,
        alignItems: 'stretch'
    },

    enterButton: {},

    cancelButton: {
        backgroundColor: '#ddd',
        borderRadius: 3,
        width: "100%"
    },

    progressBar: {
        backgroundColor: "#1a7be8",
        borderRadius: 3
    },

    continueButton: {
        backgroundColor: '#ddd',
        borderRadius: 3,
        width: "100%",
    },

    iconContainer: {
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    }
});