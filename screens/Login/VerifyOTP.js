import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native';
import AppStyles from '../../Themes/AppStyles';
import IMAGES  from '../../Constants/Images/';
import Modal from "react-native-modal";
import {showMessage} from "react-native-flash-message";
import {Item, Input, Label, Button, Container, Content, Form } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';


export default class VerifyOTP extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email:'',
        isLoading: false,
        message:false
      }
    }

  static navigationOptions = {
    header: null
  };


  render() {
    return (
      //Toast.show('This is a toast.');
      // <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView>
        <Modal isVisible={true} backdropOpacity={1} style={AppStyles.modalPrimary}>
            <View style={AppStyles.modalWrap}>
              <View style={{paddingTop: 20}}>
                <TouchableOpacity onPress={this._ModalClose} style={AppStyles.modalClose}>
                  <Image source={IMAGES.close}/>
                </TouchableOpacity>
              </View>

              <View style = {{marginTop: 78}}>
                <Text style={{textAlign: 'center', fontFamily:'SourceSansPro-Bold', fontSize: 20, color: '#222222'}}>ENTER YOUR CONFIRMATION CODE</Text>
                </View>
              <Container>
                <Content style={{marginTop: 40}} contentContainerStyle = {{borderColor : "white"}}>
                  <Form>
                    <Item regular style = {{ borderColor : "white", marginLeft: 20, marginRight: 20, alignContent: 'center'}}>
                    <Input textAlign = 'center' placeholder='' style={{width: 20, borderBottomWidth:2, borderBottomColor: "#D8D8D8", marginVertical: 10, height: 36}}/>
                    <Input textAlign = 'center' placeholder='' style={{width: 20, borderBottomWidth:2, borderBottomColor: "#D8D8D8", marginLeft: 13, marginVertical: 10, height: 36}}/>
                    <Input textAlign = 'center' placeholder='' style={{width: 20, borderBottomWidth:2, borderBottomColor: "#D8D8D8", marginLeft: 13, marginVertical: 10, height: 36}}/>
                    <Input textAlign = 'center' placeholder='' style={{width: 20, borderBottomWidth:2, borderBottomColor: "#D8D8D8", marginLeft: 13, marginVertical: 10, height: 36}}/>
                    </Item>
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 3.5, y: 0.2}}
                      locations={[0.0, 0.4]}
                      colors={['#1B75BC', '#9AD8DD']}
                      style={{
                        borderRadius: 4,
                        marginTop: 39.5
                      }}
                      >
                        <Button block  transparent large onPress={this.handleCloseModal}><Text style={{fontSize: 18, color:'#F9F9F9'}}>ENTER</Text></Button>
                    </LinearGradient>
                    <TouchableOpacity onPress={()=> {}} style={{flex:1,alignItems:"flex-end"}} transparent>
                    <Text style={{fontSize: 13, color:'#999', alignSelf: 'center', marginTop: 16, textAlign: 'center', paddingHorizontal: 0, lineHeight: 16}}>You will receive SMS to confirm your existing phone number</Text>
                    </TouchableOpacity>

              </Form>
                </Content>
              </Container>
            </View>
          </Modal>
        </ScrollView>
      // </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({

});



/*
<Modal isVisible={this.state.isModalVisible} backdropOpacity={1} style={AppStyles.modalPrimary}>
            <View style={AppStyles.modalWrap}>
              <View style={{paddingTop: 20}}>
                <Text style={{textAlign: 'center', fontSize: 22, color: '#222222'}}>Sign In</Text>
                <TouchableOpacity onPress={this._ModalClose} style={AppStyles.modalClose}>
                  <Image source={IMAGES.close}/>
                </TouchableOpacity>
              </View>
              <Container>
                <Content style={{paddingTop: 100}}>
                  <Form>
                    <Item regular>
                      <Text style={{color:'#1B75BC', fontSize: 14, paddingLeft: 20, paddingRight: 14}}>US +1</Text>
                      <Input placeholder='Number' style={{borderLeftWidth: 1, borderLeftColor: '#E1E1E1', marginVertical: 10, height: 36}}/>
                    </Item>
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 3.5, y: 0.2}}
                      locations={[0.0, 0.4]}
                      colors={['#1B75BC', '#9AD8DD']}
                      style={{
                        borderRadius: 4,
                        marginTop: 15
                      }}
                      >
                        <Button block  transparent large onPress={this.handleCloseModal}><Text style={{fontSize: 18, color:'#fff'}}>NEXT</Text></Button>
                    </LinearGradient>

                    <Text style={{fontSize: 13, color:'#999', alignSelf: 'center', marginTop: 16, textAlign: 'center', paddingHorizontal: 0, lineHeight: 16}}>You may receive SMS updates from Brag House and can opt out at any time.</Text>


                  </Form>
                </Content>
              </Container>
            </View>
          </Modal>

*/
