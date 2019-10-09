
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View
} from 'react-native';

export const  convertStringToLowerCase = (stringToConvert) => 
    {
        return (stringToConvert.slice(0, stringToConvert.length).toLowerCase());
    } 

export const  convertToStringCapitalizedForm = (stringToCapitalized) =>
    {
        stringToCapitalized = convertStringToLowerCase(stringToCapitalized)
        return (stringToCapitalized.slice(0,1).toUpperCase() + stringToCapitalized.slice(1, stringToCapitalized.length) );
    }

    // const Category = (props) => {

    //     const foo = () => {return(console.log('arrow'));}
    // }

    // export default Category;

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
    
    export const replaceAll = (str, map) =>
    {
        for (const key in map) {
            if (map.hasOwnProperty(key)) {
                const element = map[key]
                str = str.replaceAll(key, element);
            }
        }
        return str;
        
    }