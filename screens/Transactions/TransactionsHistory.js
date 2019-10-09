import React, { Component } from 'react';
import { List } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground,
  FlatList, SectionList, Dimensions, Platform, ActivityIndicator
} from 'react-native';

import { AppStyles, Images } from '../../Themes'
import * as URLConstants from '../../Networking/URLConstants/';
import Utility from '../../Utils/Utility';
import WSManager from '../../Networking/WSManager/';
import { NavigationActions } from 'react-navigation';
import ConstantLib from '../../Constants/ConstantLib';

let screenWidth = Dimensions.get('window').width
let mContext = null;
export default class TransactionsHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      transactionsData: []
    }
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    mContext = this;
  }

  static transactionListdata(transData) {
    var tempArray = [];
    if (transData != null && transData.length > 0) {
      tempArray = transData  
      mContext.setState({ transactionsData: tempArray })
    }
  }

  getContestMasterData(contestId, contestUniqueId ) {
    this.setState({ loading: true })
    const params = {
      contest_id: contestId,
      contest_unique_id: contestUniqueId,
    };

   

    WSManager.postData(URLConstants.JOIN_BRAG_MASTER_API, params)
      .then(response => {
      
        
       console.log('BragID============================'+JSON.stringify(response.data.data)+'============================')
       
       if (''+response.data.data.status == '0')
       {
         
        ConstantLib.IS_COMPLETE = '0';
      
       }
       else if (''+response.data.data.status == '2' || ''+response.data.data.status == '3')
       {
        
        ConstantLib.IS_COMPLETE = '1';
   
       }
       this.setState({ loading: false }, () => {
         if (response.data.data.status != '1')
         {
          this.goToBHEntriesScreen(contestId, contestUniqueId)
         }
         else
         {
          alert('Brag has been canceled due to insuffcient participation');
         }
          
       })
      })
      .catch(error => {
        this.setState({ loading: false })
        console.log('Error= ' + JSON.stringify(error));
        return error;
      });
  }
  // /:{'contest_id':userDetails.contest_id,'contest_unique_id':userDetails.contest_unique_id,'conference_name':userDetails.conference_name,'isFromConference':'false', 'isComplete':'0'},
 goToBHEntriesScreen(contestId, contestUniqueId)
 {
   
  
  const navigateAction = NavigationActions.navigate({
    routeName: 'BHEntries',
    index:0,
    params: {'contest_id':contestId,'contest_unique_id':contestUniqueId, 'isComplete':ConstantLib.IS_COMPLETE},
    action: NavigationActions.navigate({ routeName: 'BHEntries' })
   })
   const nav = WSManager.getTopLevelNavigator()
   nav.dispatch(navigateAction)
 }
  showTransactionDetail(rowData)
  {
    if (rowData.source == 1) {
      // alert('JoinGame');
      this.getContestMasterData(rowData.contest_id,rowData.contest_unique_id)
    } else if (rowData.source == 2) {

      alert('Brag has been canceled due to insuffcient participation');
      
    } else  if (rowData.source == 3) 
    {

      // alert('GameWon');
      this.getContestMasterData(rowData.contest_id,rowData.contest_unique_id)
      // const navigateAction = NavigationActions.navigate({
      //   routeName: 'BHEntries',
      //   index:0,
      //   params: {'contest_id':rowData.contest_id,'contest_unique_id':rowData.contest_unique_id, 'isComplete':'1'},
      //   action: NavigationActions.navigate({ routeName: 'BHEntries' })
      //  })
      //  const nav = WSManager.getTopLevelNavigator()
      //  nav.dispatch(navigateAction)
      
    } else if (rowData.source == 10)
    {
      alert('DepositPoint');

    }


  }
  _renderTransactionHistoryRow = (rowData, sectionID, rowID) => {

    return (
      <TouchableOpacity onPress = {() => this.showTransactionDetail(rowData)}>
        <View style={{ flexDirection: 'row', margin: 16, overflow: 'hidden', }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', backgroundColor:'transparent'  }}>
              <View style={{ flex: 1, backgroundColor:'transparent' }}>
                <Text style={{ fontSize: 16, fontFamily:'SourceSansPro-Bold', color: '#444444' }}>{rowData.trans_desc}</Text>
              </View>
              <View style = {{justifyContent:'flex-start', backgroundColor:'transparent' }}>
                <Text style={{
                  paddingHorizontal: 5, paddingVertical: 3, borderColor: (rowData.status==='1') ? '#53AA81' : (rowData.status ==='0' ? '#D59938' : 'red'), borderWidth: 0.7,
                  borderRadius: 21 / 2, marginLeft: 10, marginTop: 0, color: (rowData.status==='1') ? '#53AA81' : (rowData.status ==='0' ? '#D59938' : 'red'), fontSize: 10, 
                  fontFamily:'SourceSansPro-Bold', textAlignVertical: 'center', alignSelf: 'center'}}>{rowData.status ==='0' ? 'PENDING' : (rowData.status ==='1' ? 'COMPLETED' : 'FAILED')}</Text>
                </View>
            </View>
            <View style={{ marginTop: 7 }}>
              <View><Text style={{ fontSize: 13, fontFamily:'SourceSansPro-Bold', color: '#9D9CA4' }}>Trans. ID: {rowData.order_id}, {Utility.getFormatedDate(rowData.date_added, 'Do MMM Y')}</Text></View>
            </View>
          </View>

          <View style={{ alignContent: 'flex-start', width:100, alignSelf: 'center' }} >
            <View>
              <Text style={{ marginLeft: 0, alignSelf:'center', marginRight: 0, fontSize: 18, fontFamily:'SourceSansPro-Bold', color:'#3589C2' }}>{rowData.points} BB</Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: '#DDDDDD', height: 1, width: screenWidth }}></View>
      </TouchableOpacity>
    )
  }

  render() {

    return (
      <View style={{ backgroundColor: 'white', flex: 1, }}>

        <List
          showsVerticalScrollIndicator={false}
          horizontal={false}
          dataArray={this.state.transactionsData}
          renderRow={(item, sectionID, rowID) => this._renderTransactionHistoryRow(item, sectionID, rowID)}>
        </List>

      </View>
    );
  }
}



