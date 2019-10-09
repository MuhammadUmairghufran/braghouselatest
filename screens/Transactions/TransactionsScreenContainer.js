

import React, { Component } from 'react';
import { NativeModules, AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList,BackHandler, ImageBackground,  }
  from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3, Header, Left, Right, Tab, Tabs, Toast }
  from 'native-base';
import { AppStyles, Images } from '../../Themes'
import LinearGradient from 'react-native-linear-gradient';

import stripe from 'tipsi-stripe'

import Ripple from 'react-native-material-ripple';

import TransactionsHistory from '../../screens/Transactions/TransactionsHistory';
import IMAGES from '../../Constants/Images';
import WSManager from '../../Networking/WSManager';
import * as URLConstants from '../../Networking/URLConstants';
import { TabBarTop } from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer'
import { createMaterialTopTabNavigator as TabNavigator} from 'react-navigation-tabs'
import Loader from '../../Utils/Loader/';
import AddPayment from '../../Utils/AddPayment/';
import ConfirmPayment from '../../Utils/ConfirmPayment/';
import Toaster from "../../Utils/Toaster";

import ConstantLib from '../../Constants/ConstantLib';
import PreferenceConstant, {UserCurrentBalancePreferenceConstant} from '../../Preferences/PreferenceConstant';
import {getItem,saveItem} from '../../lib/Session';
import {PaymentRequest} from 'react-native-payments/lib/js';
import { NavigationActions } from 'react-navigation';
import { SOUTH } from '../../Constants/Strings';

stripe.setOptions({
  publishableKey: 'pk_test_GV1C7NNFW3MaGiyXanFEBSa3',
  androidPayMode: 'production', //production //test
})
// var ApplePay = require('react-native-apple-pay');
// ApplePay.canMakePayments()


let mNavigation = null;
let listener = null   
//environment: 'Test', 
const METHOD_DATA = [{
  supportedMethods: ['apple-pay'],
  data: {
    merchantIdentifier: 'merchant.com.brag.BragHouse',
    supportedNetworks: ['visa', 'mastercard', 'amex'],
    countryCode: 'US',
    currencyCode: 'USD', 
    
    paymentMethodTokenizationParameters: {
      parameters: {
        gateway:'stripe',
        'stripe:publishableKey': 'pk_test_jsDWl0tuOT86Usv0pEbs2DZN00g8Agmspy'//'pk_live_Bg9MJgY9XMfpgc76eMzguHFU', //'pk_test_GV1C7NNFW3MaGiyXanFEBSa3',//
      }
    }
  }
}];

const METHOD_DATA_Android = [{
  supportedMethods: ['android-pay'],
  data: {
    supportedNetworks: ['visa', 'mastercard', 'amex'],
    currencyCode: 'USD',
    countryCode: 'US',
    environment: 'Production', // defaults to production
    paymentMethodTokenizationParameters: {
      tokenizationType: 'GATEWAY_TOKEN',
      parameters: {
        gateway:'stripe',
        'stripe:publishableKey': 'pk_live_Bg9MJgY9XMfpgc76eMzguHFU',
        'stripe:version': '5.0.0' 
      }
    }
  }
}];

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 0 : 0 }}
  >
  </LinearGradient>

);
export const CustomTab = TabNavigator({
  'Transactions History': {
  screen: props => <TransactionsHistory {...props} {...mContext.state.transactionListData} />
  }
  
  
  }, {
  
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
  
  tabBarOptions: {
  activeTintColor: '#ffffff',
  inactiveTintColor: '#ffffff60',
  allowFontScaling: false,
  style: {
  backgroundColor: 'transparent',
  borderColor: 'red',
  elevation:0
  },
  tabStyle:
  {
  paddingTop: 0,
  },
  
  labelStyle:
  {
  fontSize: 14,
  fontFamily:'SourceSansPro-Bold',
  color: '#ffffff',
  alignSelf: 'center'
  },
  
  indicatorStyle:
  {
  backgroundColor: '#FFFFFF',
  height: 2
  }
  },
  },
  
  
  );

export default class TransactionsScreenContainer extends Component {

  static navigationOptions = ({ navigation }) => {
    mNavigation = navigation;
    return {
      header: null
    };
  };
  state = {
    index: 0,
    userBalanceData: '',
    transactionListData: [],
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
    isAddPayment:false,
    isConfirmPayment: false,
    bankAccountSet: '0',

    userBankDetail:{}
  };

  componentDidMount() {

    
    this.getBankAccountStatus()
    getItem(PreferenceConstant.USER_ID).then((value)=>{
        ConstantLib.USER_ID=value;
        this.callTransactionHistoryApi(true);
        this.callGetUserBalanceApi(true);
    })

    
       
    // if (Platform.OS == "android" && listener == null) {
    //   listener = BackHandler.addEventListener("hardwareBackPress", () => {
    //    })
    // }
  }

  getBankAccountStatus()
  {
    getItem(PreferenceConstant.BANK_ACCOUNT_SET).then((value) => {
      this.setState({ bankAccountSet: value })
    })
  }
  

  componentWillUnmount()
  {
    this.setState({isAddPayment: false}) 
    this.setState({isConfirmPayment: false}) 
    
  }
  callTransactionHistoryApi(isShowLoader) {
    this.setState({ loading: isShowLoader })
    const params = {
      offset: 0,
      limit: 10,
      sort_field: 'order_id',
      sort_order: 'DESC',

    };

    WSManager.postData(URLConstants.GET_TRANSACTION_HISTORY, params)
      .then(response => {
        this.setState({ loading: false })

        var data = response.data.data;
        this.setState({ transactionListData: data.transaction_history })
        if (this.state.transactionListData.length > 0) {
          TransactionsHistory.transactionListdata(data.transaction_history)
        }
        console.log(data)

        console.log('TopBraggersApi Success = ' + JSON.stringify(data));
      })
      .catch(error => {
        this.setState({ loading: false })
        console.log('Error = ' + JSON.stringify(error.response.data));
        return error;
      });
  }

  callGetUserBalanceApi(isShowLoader) {
    this.setState({ loading: isShowLoader })
    const params = {

      user_id: ConstantLib.USER_ID


    };

    WSManager.postData(URLConstants.GET_USER_BALANCE, params)
      .then(response => {
        this.setState({ loading: false })

        var data = response.data.data;
        this.setState({ userBalanceData: data.user_balance })
        saveItem(UserCurrentBalancePreferenceConstant.POINT_BALANCE , ''+data.user_balance.point_balance);

        console.log('callGetUserBalanceApi Success = ' + JSON.stringify(data));
      })
      .catch(error => {

        this.setState({ loading: false })
        console.log('callGetUserBalanceApi Error = ' + JSON.stringify(error));
        return error;
      });
  }
  showAddPaymentBox(mContext)
  {
    this.setState({isAddPayment: true}) 
    
  }

  showConfirmPaymentBox(mContext)
  {
    this.setState({isConfirmPayment: true}) 
  }
   
  
  withDraw() 
  {
    if (this.state.bankAccountSet == '1')
    {
      this.showConfirmPaymentBox()
    }
    else
    {
      this.addBankAccount()
    }
    
  }

  addBankAccount(userBankDetail)
  {
      const navigateAction = NavigationActions.navigate({
         routeName: 'Withdraw',
         params: {userBankDetail: userBankDetail, tsc: this}
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
  }

  updateBankAccount()
  {
      const params = {
       
     };
      WSManager.postData(URLConstants.GET_USER_PROFILE, params)
       .then(response => {
         console.log(JSON.stringify(response.data.data));
         if (response.data.response_code == '200')
         {
          this.setState({userBankDetail:response.data.data.user_bank_detail}, () => {
            setTimeout(() => {
              this.addBankAccount(response.data.data.user_bank_detail)
            }, 200);
          })
         }
         
       })
       .catch(error => {
           return error;
       });
  }




  addPaymentMethod(bragBucks, _orderID)
  {
    console.log(bragBucks+','+_orderID)
    DETAILS = {
      id: _orderID,
      displayItems: [
        {
          label: bragBucks+' Brag Bucks',
          amount: { currency: 'USD', value: ''+bragBucks}
        }
      ],
      total: {
        label: 'BragHouse Merchant',
        amount: { currency: 'USD', value: ''+bragBucks }
      }
    };
  
  //   (async () => {
  //     try{
        
  //       const options = {
  //         total_price: '80.00',
  //         currency_code: 'USD',
  //         shipping_address_required: false,
  //         billing_address_required: true,
  //         shipping_countries: ["US", "CA"],
  //         line_items: [{
  //           currency_code: 'USD',
  //           description: 'Whisky',
  //           total_price: '50.00',
  //           unit_price: '50.00',
  //           quantity: '1',
  //         }, {
  //           currency_code: 'USD',
  //           description: 'Vine',
  //           total_price: '30.00',
  //           unit_price: '30.00',
  //           quantity: '1',
  //         }],
  //       }

  //       const token = await stripe.paymentRequestWithAndroidPay(options)

  //       } catch (error) {
  //         console.tron.log('error:'+error)
  
  //       this.setState({ loading: false })
  //     }
  // })();

  paymentRequest = new PaymentRequest(METHOD_DATA_Android, DETAILS);
  //  console.log('Payment Request Data: ',JSON.stringify(paymentRequest))
      paymentRequest.show() 
      .then(paymentResponse => {

        // console.log('Payment Data: ',JSON.stringify(paymentResponse.details.paymentToken))
      //  paymentResponse.complete('fail'); //'fail' | 'success' | 'unknown'
        
        //processPayment(paymentResponse);
        this.chargeStripe(bragBucks, paymentResponse.details.paymentToken, paymentResponse)
        //return true;
        //return //processPayment(paymentResponse);
      })
      .catch((error) => {
          alert('Cancelled Payment')
          //this.updateOrderStatus(_orderID, '2')
      } )


  }
  

  
  chargeStripe(amount, token, paymentResponse) {
    this.setState({ loading: true })
    // const params = {
    //   "order_id": _orderID,
    //   "status": status,
    //   "source_id": "0"
    // };
    const params = {
      "amount": amount,
      
      "source": token
    };
     flag = true;
    console.log('Params ============ ', JSON.stringify(params))
  
    WSManager.postData(URLConstants.CHARGE_STRIPE, params)
      .then(response => {
        this.setState({ loading: false })
        
        var data = response.data.data;
        console.log('Data ============ ', JSON.stringify(response))
        if (response.data.response_code == '200')
        {
          paymentResponse.complete('success'); //'fail' | 'success' | 'unknown'
          flag = false;
          setTimeout(() => {
            this.callTransactionHistoryApi(false);
            this.callGetUserBalanceApi(false);
          }, 500);
        }
      })
      .catch(error => {
        this.setState({ loading: false }, () => {
          setTimeout(() => {
              if (flag)
              {
                paymentResponse.complete('fail'); //'fail' | 'success' | 'unknown'
                //this.updateOrderStatus(amount, token); 
              }
          }, 500);
        })
        
        console.log('Error = ' + JSON.stringify(error.response.data));
        return error;
      });
  }

  withDrawAmount(amount) {
    this.setState({ loading: true })
    // const params = {
    //   "order_id": _orderID,
    //   "status": status,
    //   "source_id": "0"
    // };
    const params = {
      "user_id": ConstantLib.USER_ID,
      "amount": amount,
      "source": "8",
      "source_id": "0",
      "plateform": "1",
      "cash_type":"3",
    }
     flag = true;
    console.log('Params ============ ', JSON.stringify(params))
  
    WSManager.postData(URLConstants.FINANCE_WITHDRAW, params)
      .then(response => {
        this.setState({ loading: false })
        
        var data = response.data.data;
        console.log('Data ============ ', JSON.stringify(response))
        if (response.data.response_code == '200')
        {
          flag = false;
          setTimeout(() => {
            this.callTransactionHistoryApi(false);
            this.callGetUserBalanceApi(false);
          }, 500);
        }
      })
      .catch(error => {
        this.setState({ loading: false }, () => {
          setTimeout(() => {
              if (flag)
              {
                alert('Withdraw Cancelled')
              }
          }, 500);
        })
        
        console.log('Error = ' + JSON.stringify(error.response.data));
        return error;
      });
  }

  
  getOrderID(amount,card_number,exp_month,exp_year,cvc) {
    // alert(amount)
    // alert(card_number)
    // alert(exp_month)
    // alert(exp_year)
    // alert(cvc)
    this.setState({ loading: true })
    const params = {
      "user_id": ConstantLib.USER_ID,
      "amount": amount,
      "source": "7",
      "source_id": "0",
      "plateform": "1",
      "cash_type":"2"
    };
    //  const params = {
    //   "user_id": ConstantLib.USER_ID,
    //   "amount": amount,
    //   "card_number": parseInt(card_number),
    //   "exp_month": exp_month,
    //   "cvc": cvc,
    //   "exp_year":exp_year
    // };

    WSManager.postData(URLConstants.GET_ORDER_ID, params)
      .then(response => {
        this.setState({ loading: false })
        
        var data = response.data.data;
        
        this.setState({orderID:data.order_id}, () => {
          setTimeout(() => {
            this.addPaymentMethod(amount, ''+data.order_id);  
          }, 200);
        })
        
      })
      .catch(error => {
        this.setState({ loading: false })
        if (this.state.orderID == '')
        {
          this.getOrderID(amount)
        }
        
        console.log('Error = ' + JSON.stringify(error.response.data));
        return error;
      });

    // WSManager.postData(URLConstants.CHARGE_STRIPE, params)
    // .then(response => {
    //   this.setState({ loading: false })
      
    //   var data = response.data.data;
    //   console.log('Data ============ ', JSON.stringify(response))
    //   if (response.data.response_code == '200')
    //   {
        
    //     console.log('Data22 ============ ', JSON.stringify(response))
    //     // paymentResponse.complete('success'); //'fail' | 'success' | 'unknown'
    //      //flag = false;
    //     setTimeout(() => {
    //       Toaster.showLongToast('Payment successfully');
    //      this.callTransactionHistoryApi(false);
    //      this.callGetUserBalanceApi(false);
    //     }, 500);
    //   }
    // })
    // .catch(error => {
    //   this.setState({ loading: false }, () => {

    //     //alert('Payment Failed')
    //     setTimeout(() => {
    //       Toaster.showLongToast('Payment Failed');
    //          // paymentResponse.complete('fail'); //'fail' | 'success' | 'unknown'
    //           //this.updateOrderStatus(amount, token); 
           
    //     }, 500);
    //   })
      
    //   console.log('Error = ' + JSON.stringify(error.response.data));
    //   return error;
    // });
  }

  static router = CustomTab.router
  render() {
    mContext = this;
    return (

      <View style={{ flex: 1 }} >

        <MyStatusBar backgroundColor="rgba(0,0,0,0.0)" barStyle="light-content" />
        <LinearGradient
          start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
          locations={[0.0, 0.4]}
          colors={['#1B75BC', '#9AD8DD']}
          style={{ paddingTop: Platform.OS === "ios" ? 30 : 20, width: '100%', height: '100%' }}>
          <Loader loading={this.state.loading} />
          <AddPayment loading={this.state.isAddPayment} mContext = {mContext}/>
          <ConfirmPayment loading={this.state.isConfirmPayment} mContext = {mContext}/>
          <View >
            <View style={{ flexDirection: 'row', paddingTop: 27, marginLeft: 15, }}>
              <View style={{ zIndex:1, justifyContent: 'center', height: 25, width: 25, padding: 0, backgroundColor: 'transparent', }}>
                <TouchableOpacity onPress={() => mNavigation.dispatch(DrawerActions.openDrawer())} style={{ justifyContent: 'center', height: 25, width: 25, backgroundColor: 'transparent', }} transparent>
                  <Image source={IMAGES.ic_drawer_menu} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'transparent',marginLeft: -40 }}>
                <Text style={{ fontSize: 14, color: '#ffffff', alignSelf: 'center', fontFamily:'SourceSansPro-Regular' }} >Total Brag Bucks</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 0, paddingBottom: 0 }}>
              <Text style={{ fontSize: 48, color: '#ffffff', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{this.state.userBalanceData.point_balance}</Text>
            </View>


       <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress = {() => {
              this.showAddPaymentBox(mContext)
             // this.addPaymentMethod()
            }} style={{ alignSelf: 'center', justifyContent: 'center',marginRight:5, backgroundColor: 'transparent', height: 30, width: 150, borderRadius: 15, borderColor: '#FFFFFF', borderWidth: 0.6 }}>
              <Text style={{ fontSize: 12, color: '#ffffff', fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'BUY BRAG BUCKS'}</Text>
            </TouchableOpacity>
          <TouchableOpacity onPress = {() => {
              this.withDraw()
              //this.addPaymentMethod()
            }} style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 30, width: 150, borderRadius: 15, borderColor: '#FFFFFF', borderWidth: 0.6 }}>
              <Text style={{ fontSize: 12, color: '#ffffff',marginLeft:5, fontFamily:'SourceSansPro-Bold', textAlign: 'center', }}>{'WITHDRAW'}</Text>
            </TouchableOpacity>

      </View>
         
         
          </View>


          <CustomTab navigation = {this.props.navigation} />
        </LinearGradient>

      </View>
    );
  }
}

// <View style={{ justifyContent: 'center', height: 30, alignSelf: 'center', marginTop: 17, marginBottom: 33, borderWidth: 1, borderColor: '#FFFFFF', borderRadius: 30 / 2, paddingVertical: 8, paddingHorizontal: 18 }}>
//                 <Text style={{ color: '#FFFFFF', fontSize: 12 }}>BUY BRACK BUCKS</Text>
//               </View>

