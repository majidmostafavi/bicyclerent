import React, {Component} from 'react';
import {createBottomTabNavigator} from "react-navigation-tabs";
import Icons from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import * as Navigators from './index';
import i18n from '../I18n';
import {createStackNavigator} from "react-navigation-stack";
import LoginModal from "../../screens/login-modal";
import * as blog from "../../screens/blog";

const activeColor = "#333";
const inactiveColor = "#ccc";
const backgroundColor = '#fafafa';

const AppTabNavigator = createBottomTabNavigator({
    tour: {
        screen: Navigators.TourNavigator,
        navigationOptions: {
            tabBarLabel: i18n.t('tours')
        }
    },
    blog: {
        screen: createStackNavigator(blog, {
            defaultNavigationOptions:{header: null}
        }),
        navigationOptions: {
            tabBarLabel: i18n.t('blog')
        }
    },
    profile: {
        screen: Navigators.ProfileNavigator,
        navigationOptions: {
            tabBarLabel: i18n.t('profile')
        }
    },


}, {
    defaultNavigationOptions: ({navigation}) => ({
        //define the icon for each tab here...
        tabBarIcon: ({focused, tintColor}) => {
            const {routeName} = navigation.state;
            const color = focused ? activeColor : inactiveColor;
            let icon;
            switch (routeName) {
                case 'tour':
                    icon = `ios-bicycle`;
                    break;
                case "profile":
                    icon = `ios-person`;
                    break;
                case "blog":
                    icon = `md-book`;
                    break;
            }

            return <Icons
                name={icon}
                size={25}
                color={color}/>;
        },
    }),
    tabBarOptions: {
        initialRouteName: 'tours',
        activeTintColor: activeColor,
        inactiveTintColor: inactiveColor,
        showLabel: true,
        style: {
            backgroundColor: backgroundColor,

        }
    }
});
const ModalsNavigator = createStackNavigator({

        Login: {
            screen: LoginModal
        },
        AppTabNavigator: AppTabNavigator
    },
    {
        // defaultNavigationOptions:{header: null},
        initialRouteName: 'AppTabNavigator',
        headerMode: 'none',
        mode: "modal",
        transparentCard: true,
    });

export default createAppContainer(ModalsNavigator);
