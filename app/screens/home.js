/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {
    LearnMoreLinks,
  } from 'react-native/Libraries/NewAppScreen';


const Home = () => {
  return (
      <SafeAreaView><ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View>
              <LearnMoreLinks />
          </View>
        </ScrollView></SafeAreaView>
  );
};


export default Home;
