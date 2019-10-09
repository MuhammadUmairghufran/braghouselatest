import {Platform} from 'react-native';


const AppStyles = {
  Wrapper:{
  	flex:1,
  },
  darkContainer: {
    backgroundColor: '#F4F4F4',
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
    flex:1
  },
  teamLogo:{
    width:64,
    height: 64,
    alignItems:'center',
    justifyContent: 'center',
  },
  absoluteSection: {
    position: 'relative',
    zIndex: 1
  },
  lbltxt: {
    marginLeft: 5,
  },
  statusBar: {
    height: Platform.OS === "ios" ? 0 : 0
  },
   video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

  },
  linkTxt: {
    color:'#FFF',
    fontSize: 16,
    fontFamily:'SourceSansPro-Regular',
  },
  center: {
    alignItems: 'center'
  },
  modalWrap: {
    backgroundColor: '#fff',
    flex:1,
    padding: 28
  },
  modalPrimary: {
    margin:0,
  },
  modalClose: {
    position: 'absolute',
    right:-10,
    top:0,
    padding: 20,
    zIndex: 1
  },
  heading:{
    fontSize: 22,
    color:'#222222',
  },
  indicator:{
    backgroundColor: 'rgba(85,186,255,1)',
    height: 3
  },
  tabbar:{
    backgroundColor: '#FFF'
  },
  tabLabel:{
    color:'rgba(85,186,255,1)',
    fontSize: 14,
    padding: 0
  },
  tab:{
    padding:0,
    paddingVertical: 10
  },
Conference: {
  flex:1,
  flexDirection: 'row',
  //height: 60,
  padding:10,
  alignItems:'center',
  borderBottomWidth: 1,
  borderBottomColor: '#DBDBDB',
},
Conference_item_text: {
  flex:1,

  fontSize:16,
  color:'#000000',
  fontFamily:'SourceSansPro-Regular',
  fontWeight: '600',
  paddingLeft:10,

  justifyContent: 'flex-start',



},
Conference_item_image: {
  resizeMode:'contain',
  color:'#666666',
   zIndex: 0,
    left:0,
    right:0,
    width:36,
    height:36,
    // borderRadius:36/2,
},
Conference_item_image_parent: {
  width:42,
  height:42,
  justifyContent: 'flex-start',

},
Conference_item_right: {
    flex:1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  backgroundColor:'green',
  alignItems:'center',

},
  Conference_item_text_right: {
    fontSize:12,
    color:'#000000',
    fontFamily:'SourceSansPro-Regular',
    paddingLeft:7,
    paddingRight:7,
    paddingTop:3,
    paddingBottom:3,
    textAlign:'center',
    justifyContent: 'flex-end',
  },
  header_title: {
    fontSize:18,
    color:'#fff',
    fontFamily:'SourceSansPro-Bold',
        textAlign:'center'

  },
  header_sub_title: {
    fontSize:14,
    color:'#fff',
    fontFamily:'SourceSansPro-Regular',
    textAlign:'center',
//marginLeft:-35,
  },

}
export default AppStyles
