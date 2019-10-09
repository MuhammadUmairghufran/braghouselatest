import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator, 
  Text,
  TextInput, TouchableOpacity, Image
} from 'react-native';
import TransactionsScreenContainer from '../screens/Transactions/TransactionsScreenContainer';

import IMAGES from '../Constants/Images';
import Toaster from "./Toaster";

class ConfirmPayment extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            amount:'',
        }
    }
 
    
  render()
  {
    const { loading, mContext, ...attributes } = this.props;
    
   
    return (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={loading}
          closeOnClick={true}
          onRequestClose={() => {console.log('close modal')}}>
          <View style={styles.modalBackground}>
          
            <View style={styles.paymentOptionBoxContainer}>
                <View style = {{position: 'absolute',flexDirection: 'row', alignItems: 'center', justifyContent: 'center' ,backgroundColor: '#1B75BC', width: '100%', height: 70, marginTop: -80, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                    <View style = {{flex: 1}}><Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'Withdraw Amount'}</Text></View>
                    <TouchableOpacity onPress = {() => { 
                        mContext.setState({isConfirmPayment: false})
                        }} style = {{position: 'absolute', top:10, right: 10}}><Image source = {IMAGES.ic_navigation_cross} ></Image></TouchableOpacity>
                </View>
    
                <View style={[styles.paymentOptionBox,]}>
                {/* <View style = {{alignSelf:'center', marginVertical: 10 , fontSize: 16, color: '#FFFFFF', fontFamily:'SourceSansPro-Regular', fontWeight: 'bold', textAlign: 'center',}}><Text>{'Enter Amount To Withdraw'}</Text></View> */}
                <View style = {{alignSelf:'center', width:'100%', height: 50, marginVertical: 10, marginTop: 40 }}>
                    <TextInput placeholder = 'Enter amount to withdraw' keyboardType='phone-pad' value = {this.state.amount} onChangeText = {(amount) => this.setState({amount: amount})} style = {{ alignSelf:'center', width: '90%'}}></TextInput>
                </View>
                {/*
                    <View style = {{flexDirection:"row", justifyContent:'flex-start', marginVertical: 5}}>
                    <TouchableOpacity onPress = {() => {
                        this.setState({amount: '100'})
                    }} style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 30, width: 50, borderRadius: 15, borderColor: '#9AD8DD', borderWidth: 0.6, marginHorizontal:5 }}>
                    <Text style={{ fontSize: 12, color: '#9AD8DD', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'100'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        this.setState({amount: '200'})
                    }} style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 30, width: 50, borderRadius: 15, borderColor: '#9AD8DD', borderWidth: 0.6, marginHorizontal:5 }}>
                    <Text style={{ fontSize: 12, color: '#9AD8DD', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'200'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        this.setState({amount: '500'})
                    }} style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 30, width: 50, borderRadius: 15, borderColor: '#9AD8DD', borderWidth: 0.6, marginHorizontal:5 }}>
                    <Text style={{ fontSize: 12, color: '#9AD8DD', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'500'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        this.setState({amount: '1000'})
                    }} style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 30, width: 50, borderRadius: 15, borderColor: '#9AD8DD', borderWidth: 0.6, marginHorizontal:5 }}>
                    <Text style={{ fontSize: 12, color: '#9AD8DD', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'1000'}</Text>
                    </TouchableOpacity>
                </View>
                    <View style = {{flexDirection:"row", justifyContent:'space-around', marginVertical: 5 }}>
                    <TouchableOpacity onPress = {() => {
                            this.setState({amount: '1500'})
                    }} style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 30, width: 50, borderRadius: 15, borderColor: '#9AD8DD', borderWidth: 0.6, marginHorizontal:5 }}>
                    <Text style={{ fontSize: 12, color: '#9AD8DD', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'1500'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        this.setState({amount: '2000'})
                    }} style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 30, width: 50, borderRadius: 15, borderColor: '#9AD8DD', borderWidth: 0.6, marginHorizontal:5 }}>
                    <Text style={{ fontSize: 12, color: '#9AD8DD', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'2000'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        this.setState({amount: '3000'})
                    }} style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 30, width: 50, borderRadius: 15, borderColor: '#9AD8DD', borderWidth: 0.6, marginHorizontal:5 }}>
                    <Text style={{ fontSize: 12, color: '#9AD8DD', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'3000'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        this.setState({amount: '5000'})
                    }} style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 30, width: 50, borderRadius: 15, borderColor: '#9AD8DD', borderWidth: 0.6, marginHorizontal:5 }}>
                    <Text style={{ fontSize: 12, color: '#9AD8DD', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'5000'}</Text>
                    </TouchableOpacity>
                </View>
                    */}
                    <View style = {{height: 30, width: '90%', backgroundColor: '#1B75BC', borderRadius: 5, marginVertical: 10}}>
                        <TouchableOpacity  onPress = {() => {
                            if ((this.state.amount != '') && (this.state.amount != '0'))
                            {
                                mContext.setState({isConfirmPayment: false}, () => {
                                    
                                    mContext.withDrawAmount(this.state.amount)
                                    this.setState({amount: ''}) 
                                })
                            }
                            else if (this.state.amount == '0')
                            {
                                Toaster.showLongToast('Please amount in proper format');
                            }
                            else
                            {
                                Toaster.showLongToast('Please enter the number amount');
                            }
                        }} style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 30, width: '100%', borderRadius: 5, borderColor: '#9AD8DD', borderWidth: 0.6}}>
                        <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'Withdraw'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{height: 30, width: '90%', backgroundColor: '#1B75BC', borderRadius: 5, marginVertical: 10}}>
                        <TouchableOpacity  onPress = {() => {
                            mContext.setState({isConfirmPayment: false}, () => {    
                                mContext.updateBankAccount()
                                this.setState({amount: ''}) 
                            })
                            
                        }} style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 30, width: '100%', borderRadius: 5, borderColor: '#9AD8DD', borderWidth: 0.6}}>
                            <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'Update Account'}</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            </View>
          </View>
        </Modal>
      )
  }

  
 
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  paymentOptionBox: {
    backgroundColor: 'white',
    height: 250,
    width: '80%',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    elevation:5,
    
    shadowColor:'#000000',
    shadowOpacity:0.5,
    shadowOffset:{width:5, height:5},
    shadowRadius:10,
    
    //justifyContent: 'space-around'
  },
  paymentOptionBoxContainer: {
    backgroundColor: 'white',
    height: 400,
    width: '90%',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default ConfirmPayment;


