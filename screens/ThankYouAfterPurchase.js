import React, {Component} from 'react';
import { View, Image, Text,StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { AppStyles, Images } from '../Themes';
import {LinearTextGradient} from 'react-native-text-gradient'




export default class ThankYouAfterPurchase extends Component
{

    static navigationOptions = {
        header: null
      };
    

    render()
    {
        return (
            <View style = {{backgroundColor: 'white', height: AppStyles.screenHeight}}>

            <View style={{alignSelf: 'flex-end', paddingTop: 62, paddingRight: 27}}>
                <TouchableOpacity onPress={this._ModalClose} style={AppStyles.modalClose}>
                  <Image source={Images.close}/>
                </TouchableOpacity>
              </View>

            <View style = {{width: 198, height: 226,marginTop: ((AppStyles.screenHeight/2)-(113+62)), alignSelf: 'center'}}>
                <Image style = {{}} source = {Images.thankYou_BG}  ></Image>
            <View style = {{position: "absolute",}}> 
                <LinearTextGradient
            style={{  width: 188, marginTop: 80, height: 120, lineHeight: 60, fontSize: 60, fontFamily:'SourceSansPro-Bold', textAlign: 'center'}}
            locations={[0.4, 1]}
            colors={['#1B75BC', '#9AD8DD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            >Thank You</LinearTextGradient>


            <View style={{ flexDirection: 'row', marginTop:5}}>
                <Text style = {{ fontSize: 14, fontFamily:'SourceSansPro-Bold',color: '#666666',}}>FOR PURCHASING</Text>
                <LinearTextGradient style={{ fontSize: 14, fontFamily:'SourceSansPro-Bold',}}
            locations={[0.6, 1]}
            colors={['#1B75BC', '#9AD8DD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}> 250 BB</LinearTextGradient> 
            </View>

            <Text style = {{ fontSize: 14, fontFamily:'SourceSansPro-Bold', alignSelf: 'center', color: '#666666',}}>KEEP BRAGGING!</Text>
            </View>

            </View>

            
            </View>
        );
    }
}