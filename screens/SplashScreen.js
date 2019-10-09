
import React, { Component } from 'react';
import { View, Text, Button, Image, Dimensions, StatusBar, Platform } from 'react-native';
import IMAGES from '../Constants/Images/';
import { StackActions, NavigationActions, Header } from 'react-navigation';
import AppPreferences from '../Preferences/AppPreferences';
import PreferenceConstant from '../Preferences/PreferenceConstant';
import ConstantLib from '../Constants/ConstantLib';
const WW = Dimensions.get('window').width;
const WH = Dimensions.get('window').height;
import SignUp from './Signup/SignUp';
import Conference from './Conference/Conference';
import { getItem, saveItem } from '../lib/Session';

export default class SplashScreen extends Component {
    static navigationOptions = { header: null };

    componentWillMount() {

        Platform.OS == 'ios' ? this.startScreen() :
            setTimeout(() => {
                this.startScreen();
            }, 2000);

    }

    render() {
        return (
            <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <StatusBar
                    backgroundColor={'transparent'}
                    translucent
                />

                <Image style={{ justifyContent: 'center', alignItems: 'center' }} source={IMAGES.center_logo} resizeMode={'contain'} />
            </View>
        );
    }

    startScreen() {

        getItem(PreferenceConstant.SESSION_KEY).then((value) => {
            ConstantLib.SESSION_KEY = value;
        })
        getItem(PreferenceConstant.FOLLOW_STATUS).then((value) => {
            ConstantLib.FOLLOW_STATUS = value;
            console.log('get value from pref.?>>>>>>>>>>>>>>>>>>>=' + value);
        })
        getItem(PreferenceConstant.USER_ID).then((value) => {
            ConstantLib.USER_ID = value;
        })
        getItem(PreferenceConstant.EMAIL).then((value) => {
            ConstantLib.EMAIL = value;
        })

        getItem(PreferenceConstant.PROFILE_STATUS).then((value) => {
            ConstantLib.PROFILE_STATUS = value;
            console.log('PROFILE_STATUS=' + ConstantLib.PROFILE_STATUS);
            console.log('FOLLOW_STATUS=' + ConstantLib.FOLLOW_STATUS);
            if (ConstantLib.SESSION_KEY !== '' && ConstantLib.SESSION_KEY !== null) {
                console.log('SESSION_KEY=' + ConstantLib.SESSION_KEY);
                if (ConstantLib.PROFILE_STATUS === '0') {

                    console.log('ConstantLib.PROFILE_STATUS inside if=' + ConstantLib.PROFILE_STATUS);
                    const resetAction = StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                            NavigationActions.navigate({ routeName: 'SignUp' }),
                        ]
                    });
 
                    this.props.navigation.dispatch(resetAction);
                }
                else if(ConstantLib.FOLLOW_STATUS==='0'){
                    console.log('ConstantLib.FOLLOW_STATUS inside if='+ConstantLib.FOLLOW_STATUS);
                  const resetAction = StackActions.reset({
                  index: 0,
                  key:null,
                  actions: [
                  NavigationActions.navigate({ routeName: 'Conference', params: {is_onboarding:1}}),
                  ]
                  });

                  this.props.navigation.dispatch(resetAction);
                }
                else {
                    console.log('else inside if=');
                    const resetAction = StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                              NavigationActions.navigate({ routeName: 'Drawer'}),
                            // NavigationActions.navigate({ routeName: 'ChatListing' }),
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                }
            } else {
                const resetAction = StackActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                        NavigationActions.navigate({ routeName: 'SignUpLogin' }),
                    ]
                });

                this.props.navigation.dispatch(resetAction);
            }
        })
    }

}
