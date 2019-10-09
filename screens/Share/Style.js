import { Platform, Dimensions } from 'react-native';
import * as Colors from '../../Constants/Colors/';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const actionBarHeight = Platform.OS === 'android' ? 80 : 64;
const varHeight = Platform.OS === 'android' ? 70 : 54;

const Style = {

  Wrapper: {
    flex: 1,
    backgroundColor: '#50FFF',

  },
  main_container: {
    flex: 1,
    height: deviceHeight,
    width: deviceWidth,
  },
  refer_friend_text: {
    fontSize: 20,
    color: '#333333',

    flexWrap: 'wrap',
    fontFamily:'SourceSansPro-Bold'
  },
  brag_count_text: {
    fontSize: 20,
    color: '#35B184',

  },

  mid_container: {
    minHeight: 75,
    flexDirection: 'row',
    flex: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 }
  },
  left_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  right_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  team_flag: {
    alignSelf: 'center',
  },
  team_text: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  brag_description_text: {

    fontSize:10,
    color:'#333333',
    fontFamily:'SourceSansPro-Bold'
  },
  brag_team_name_text: {

    fontSize:16,
    color:'#333333',
    fontFamily:'SourceSansPro-Bold'
  },
  brag_more_match_text: {

    fontSize:10,
    color:'#666666'
  },
  invite_text: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color:'#222222',
    fontSize:16,
    marginTop:15

  },
  link_lable_text:{
    alignSelf:'center',
    marginTop:10,

    fontSize:10,
    color:'#333333',
    fontFamily:'SourceSansPro-Bold'
  },
  invite_view:{
    backgroundColor: '#fff',
    height: 160,
    marginLeft: 15,
    paddingBottom:10,
    marginTop: 15,
    marginRight: 15,
    borderRadius: 5,
    elevation:6,
    shadowColor:'#000',
    shadowOffset:{width:2, height:2},
    shadowOpacity:0.2
  },
  invite_inner_items:{
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  share_icons_view:{
    height:40,
    width:40,
    borderRadius:20,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#E8E8E8',
    borderWidth:.5,
    elevation:5,
    shadowOffset:{ width:2, height:2},
    shadowOpacity:0.2,
    shadowColor:'#000'
  },

  seperator_style: {
    height: 1,
    backgroundColor: '#DFDFDF',
    marginTop: 15
  },

  icons_style: {
    height: 20,
    resizeMode: 'contain'
  },
  top_view:{
    minHeight: 205,
    backgroundColor: '#fff',
    elevation: 2, marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  },

}

export default Style
