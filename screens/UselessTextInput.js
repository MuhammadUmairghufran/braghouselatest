import React, { Component } from 'react';
import { View, ScrollView, AppRegistry, TextInput, InputAccessoryView, Button } from 'react-native';
import { Input } from 'native-base';

export default class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {text: 'Placeholder Text'};
  }

  render() {
    const inputAccessoryViewID = "uniqueID";
    return (
      <View>
        
          <TextInput
            style={{
              padding: 10,
              paddingTop: 50,
            }}
            
            onChangeText={text => this.setState({text})}
            value={this.state.text}
          />
        
        
        
      </View>
    );
  }
}

// skip this line if using Create React Native App
//AppRegistry.registerComponent('AwesomeProject', () => UselessTextInput);
