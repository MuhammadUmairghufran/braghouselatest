import {
  createBottomTabNavigator
} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'
import React from 'react';
import { Text, View,Button,Image } from 'react-native';
import { AppStyles, Images } from './../Themes';
import TabPlayers from './TabPlayers';



 const CustomTab = createBottomTabNavigator(
   {
      Home: {
         screen: TabPlayers,
         navigationOptions: {
                showLabel: true,
                tabBarIcon: ({ focused,tintColor }) => (
                     <Image
                         source={focused?Images.back:Images.back}
                       />

                   ),
                 showIcon: true,
                activeIconColor:'red'
         }
  },
  Bragboard: {
     screen: TabPlayers,
     navigationOptions: {
            showLabel: true,
            tabBarIcon: ({ focused,tintColor }) => (
                 <Image
                     source={focused?Images.back:Images.back}
                   />

               ),
             showIcon: true,
            activeIconColor:'red'
     }
},
Notifications: {
   screen: TabPlayers,
   navigationOptions: {
          showLabel: true,
          tabBarIcon: ({ focused,tintColor }) => (
               <Image
                   source={focused?Images.back:Images.back}
                 />

             ),
           showIcon: true,
          activeIconColor:'red'
   }
},
'My Profile': {
   screen: TabPlayers,
   navigationOptions: {
          showLabel: true,
          tabBarIcon: ({ focused,tintColor }) => (
               <Image
                   source={focused?Images.back:Images.back}
                 />

             ),
           showIcon: true,
          activeIconColor:'red'
   }
},
   },
   {
     tabBarOptions: {
       activeTintColor: 'white',
       inactiveTintColor: '#ebf5fb',

        style: {
         backgroundColor: 'transparent',

       },labelStyle: { fontSize: 12},

     }
   }

);


export default class FooterTab extends React.Component {
  render() {
    return (

        <CustomTab/>
    );
  }
}
