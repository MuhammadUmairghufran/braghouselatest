import {Platform,StatusBar,Dimensions,StyleSheet} from 'react-native';
import * as Color from '../../Themes/Colors/';

const HH = Dimensions.get('window').height;
const WW = Dimensions.get('window').width;

  const SearchStyle=StyleSheet.create({
      search_box:{
          width:'80%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor:'transparent',
          borderColor:'#FFFFFF',
          borderWidth:1,
          borderRadius:5,
          height:40,
      },
      search_input_box:{
          width:WW-140,
          height:40,
          paddingLeft:10,
          paddingRight:10,
          textAlign:'left',
          justifyContent:'center',
          backgroundColor:'transparent',
          color:'white',
          fontSize:14,
      },
      search_parent:{
          position:'absolute',
          right:10,
          width:20,
          height:20,
      },
      search_clear:{
          width:20,
          height:20,
      },
      NoRecordContainer:{
        height:300,
        width:WW,
        alignItems:'center',
        backgroundColor:'transparent',
        justifyContent:'center',
      },
      notification_container:{
        alignItems:'center',
        backgroundColor:'white',
        flexDirection:'row',
        padding:10,
        backgroundColor:'transparent',
        shadowColor:'#80000000',
        width:WW,
        height:50,
        marginTop:5,
      },

      notification_info:{
        backgroundColor:'white',
        flexDirection:'row',
        padding:10,
        backgroundColor:'transparent',
        width:WW-120,
        height:50,
      },
      follow_box:{
        position:'absolute',
        right:0,
        backgroundColor:'white',
        flexDirection:'row',
        padding:10,
        backgroundColor:'transparent',
        width:100,
        height:50,
      },
      search_list_text:{
        textAlign:'left',
        color:'#000000',
        fontSize:14,
      },
      search_box_container:{
        alignItems:'center',
        backgroundColor:'white',
        flexDirection:'row',
        padding:10,
        backgroundColor:'transparent',
        shadowColor:'#80000000',
        height:50,
        width:WW,
      },
  })

export default SearchStyle
