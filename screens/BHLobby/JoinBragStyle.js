import {Platform,StatusBar,Dimensions,StyleSheet} from 'react-native';
import * as Color from '../../Themes/Colors/';

const HH = Dimensions.get('window').height;
const WW = Dimensions.get('window').width;

const JoinBragStyle=StyleSheet.create({

      MainContainerStyle:{
        backgroundColor: '#fff',
        width:WW,
        height:HH,
        flex:1,
      },

      top_container:{
        flex:1,
        backgroundColor: 'transparent',

      },

      box_container:{
        flex:1,
        width:WW-40,
        marginLeft:20,
        marginRight:20,
        marginTop:50,
        marginBottom:10,
        elevation:2,
        padding:10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        zIndex: 999,

        shadowColor: '#999999', shadowRadius: 4, shadowOffset:{ width: 0, height: 0}, shadowOpacity: 0.5,

      
       
      },
      blue_box_container:{
        flex:0,
        width:WW-40,
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        marginBottom:10,
        elevation:2,
        padding:10,
        borderColor:'#96D8E3',
        borderWidth:1,
        backgroundColor: '#EAFBFF',
        borderRadius: 5,


        shadowColor: '#999999', shadowRadius: 4, shadowOffset:{ width: 1, height: 5}, shadowOpacity: 0.5,
      },
      Answer_container:{
        flex:0,
        width:WW-40,
        backgroundColor: 'transparent',
      },
      BragPoint_container:{
        flex:0,
        width:WW-100,
        height:100,
        backgroundColor: 'transparent',
      },

      CardStyle:{
        width:WW-20,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        elevation:5,
      },
      CardPointsStyle:{
        top:5,
        backgroundColor: '#EFEFEF',
        width:WW-20,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        elevation:5,
      },
      ques_text:{
        color:'#000000',
        backgroundColor: 'transparent',
        fontSize:16,
        fontWeight: '600',
        fontFamily: 'SourceSansPro-Regular',
        marginHorizontal:15,
        marginTop:10,
        marginBottom:10,
        


        
      },
      main_ques_text:{
        color:'#333333',
        backgroundColor: 'transparent',
        fontSize:22,
        fontWeight: '600',
        fontFamily: 'SourceSansPro-Regular',
        marginHorizontal:5,
        marginTop:10,
        marginBottom:10,
        


        
      },
      hot_ques_text:{
        color:'#1B75BC',
        backgroundColor: 'transparent',
        fontSize:24,
        fontFamily:'SourceSansPro-Bold',
        marginTop:10,
      },
      Option_Container:{
        flexDirection:'row',
        backgroundColor: 'transparent',
        width:WW,
        height:40,
      },
      hot_Option_Container:{
        flexDirection:'row',
        width:WW,
        height:40,
        alignSelf:"center"
      },
      Option_Item_Container:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: 'transparent',
        width:WW/2,
        height:40,
      },
      hot_Option_Item_Container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'transparent',
        width:WW/2,
        height:40,
      },
      LogoStyle:{
          marginRight:5,
          width:18,
          height:18,
          
      },
      NoRecordContainer:{
        height:300,
        width:WW,
        alignItems:'center',
        backgroundColor:'transparent',
        justifyContent:'center',
      },
      autocompleteContainer: {
         flex: 1,
         width:WW-60,
         height:100,
         marginTop:10,
         zIndex: 1,
         borderWidth:0,
         borderColor:'transparent',
         backgroundColor:'transparent',
         
         

         
      },
      autocomplete: {
         alignSelf: "stretch",
         backgroundColor: "#FFF",
         borderColor: "lightblue",
         borderWidth: 1
     }
})

  export default JoinBragStyle
