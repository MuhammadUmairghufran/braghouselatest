import React, { Component } from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Image,Platform} from 'react-native'
import { Item, Label, Input} from 'native-base'




export default class CreateBrag extends Component
{
    render()
    {
        return (
            <KeyboardAvoidingView  style = {styles.keyBoardAvoidingViewContainer} behavior = 'padding' enabled >
            
            <View style = {{height: 10}} ></View>

            <ScrollView>
                <View style = {styles.inputFieldsContainer}>
                    

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    

        );
    }
}



const styles = StyleSheet.create({
    keyBoardAvoidingViewContainer:
    {
        margin: 0,
        backgroundColor: 'rgb(238, 238, 238)'

    },

    inputFieldsContainer:
    {
        margin: 0,
        backgroundColor: 'white'
    }

});