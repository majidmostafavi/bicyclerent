import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {setUser} from "../actions";

function preLoad(store){
    AsyncStorage.getItem('user')
        .then(userObject => {
            if (userObject !== null) {
                try {
                    let user = JSON.parse(userObject);
                    store.dispatch(setUser(user))
                }catch(exp){
                    console.log("exp");
                }
            }
        });
}

export {preLoad};