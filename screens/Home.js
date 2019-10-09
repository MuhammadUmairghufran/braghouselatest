import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TextInput, Button, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Colors, Fonts, Metrics, ApplicationStyles, Images} from '../Themes/';

export default class Home extends Component {
   constructor(props) {
        super(props);
        this.state = {
          first_name:'',
          email:'',
          password:''
        }
    }
  static navigationOptions = {
    header: null
  };
  render() {

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView>
          <View>
           <Text style={styles.txthead}>Lobby Screen</Text>
           <Text style={{color: 'blue', fontFamily:'SourceSansPro-Bold'}} onPress={() => this.props.navigation.navigate('Login')}> Login</Text>
           <Text style={{color: 'blue', fontFamily:'SourceSansPro-Bold'}} onPress={() => this.props.navigation.navigate('SignUp')}> SignUp</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
 _onPress(event) {
    //alert('ufuftuf');
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 50
  },
  txthead: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily:'SourceSansPro-Regular'
  },
  txtsubhead: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
    color: '#808080'
  },
  grid: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
  },
  socialicn: {
    margin: 20,
  },
  formfield: {
    marginHorizontal: 20,
  },
  formElements: {
    marginBottom: 20,
    height: 40,
    paddingBottom: 15,
    paddingHorizontal: 10,
  }
});
