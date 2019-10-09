import { Platform, Dimensions } from 'react-native';
import * as Colors from '../../Constants/Colors/';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const actionBarHeight = Platform.OS === 'android' ? 80 : 64;
const varHeight = Platform.OS === 'android' ? 70 : 54;

const Style = {

  Wrapper: {
    flex: 1,
    backgroundColor:'#FAFAFA',

  },
  main_container: {
    flex: 1,
    height: deviceHeight,
    width: deviceWidth,
  },
  active_brag_parent: {
    backgroundColor:'transparent',
    alignItems: 'center',
    marginLeft: 0,
    marginRight:2,
    justifyContent: 'center',



  },
  header_inner_view: {
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
    borderRadius:3,
    marginLeft:10,
    marginRight:20,

  },
  braggers_small_image_view: {
    height: 74,
    width: 74,
    justifyContent: 'center',
    alignItems: 'center',
    elevation:4,
    backgroundColor:Colors.ColorPrimary,
    borderRadius:37
  },
  braggers_Bigger_image_view: {
    height: 94,
    width: 94,
    justifyContent: 'center',
    alignItems: 'center',
    elevation:4,
    backgroundColor:Colors.ColorPrimary,
    borderRadius:47
  },
  header_inner_view_hot_brags: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation:4,
    borderRadius:25,
    backgroundColor:Colors.ColorPrimary,
  },
  brag_text: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Bold',
    flexWrap: 'wrap',
    color: '#222222',
    marginTop: 5,
    flex:1,
    width:100,
    textAlign:'center',

  },
  braggers_name_text: {
    fontSize: 16,
    flexWrap: 'wrap',
    color: '#666666',
    fontFamily:'SourceSansPro-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    width:100,
    height: 50,
    marginTop: 5,


  },
  hot_brag_img: {
    height: 300,
    width: 30,
    borderRadius: 15,
    resizeMode:'contain'
  },
  active_brag_img: {
    height: 100,
    width: 100,

  },

  question_card_item:{
    minHeight:200,
    marginLeft:15,
    marginRight:15,
    backgroundColor:'white',
    marginTop:20,
    borderRadius:4,
    elevation:4,
    paddingLeft:20,
    paddingTop:13,
    paddingRight:15,
    paddingBottom:18,
    borderWidth:1,
    borderColor:'#D9D9D9'

  },
  share_text:{
    fontSize:10,
    color:Colors.LableTextColor,
    alignSelf:'center',
    fontFamily:'SourceSansPro-Bold'
  },
  question_footer_share_view:{
    marginTop:25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10
  },
  share_and_image:{
    padding:3,
    flexDirection: 'row'
  },
  team_name_text:{
    fontSize:18,
    color:'#000',
    fontFamily:'SourceSansPro-Bold'
  },
  question_text:{
    fontSize:18,
    color:Colors.ColorPrimary,
    fontFamily:'SourceSansPro-Bold',
    marginTop:10,
  },
  seperator_style:{
    height:1,
    backgroundColor:'#EFEEEE',
    marginLeft:-20,
    marginTop:15,
    marginRight:-15
  },
  cards_bottom_view:{
    flexDirection:'row',
    marginTop:15,
    justifyContent:'space-between'
  },
  play_button_text:{
    fontSize:14,
    color:'#fff',
    paddingLeft:18,
    paddingRight:18,
    paddingTop:7,
    paddingBottom:7,
    fontFamily:'SourceSansPro-Bold'
  },
  play_button_gradient:{
    borderRadius:18
  },
  question_card_lable_text:{
    fontSize:10,
    color:Colors.LableTextColor,
  },
  question_card_value_text:{
    fontSize:16,
    color:'#000',
    fontFamily:'SourceSansPro-Bold'
  },
  brag_item:{
    backgroundColor: '#FFF',
    marginTop: 10,
    minHeight: 330,
    elevation:5
  }

}

export default Style
