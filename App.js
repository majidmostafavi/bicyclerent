/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {StatusBar,I18nManager} from 'react-native';
import Navigators from './app/components/navigators';
import {Provider} from 'react-redux';
import store from './app/redux/store'
import codePush from 'react-native-code-push'
console.disableYellowBox = true;
const App = () => {
    return (<Provider store={store}><StatusBar/><Navigators/></Provider>);
};

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    updateDialog: false,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
};
codePush.sync({ deploymentKey: "2VcdbsZE4lzG44T3NWnaZMfD7CK8eu0bOUyla" });
// export default App;
export default codePush(codePushOptions)(App);
