
const Style = {

    list_item: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: 1,
    },

    user_image: {
        height: 48,
        width: 48,
        borderRadius: 24,
        borderColor: 'gray',
        borderWidth: 1,
        alignSelf:'center',
    },

    user_data: {
        width: '80%',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },

    left_item: {
        width: '70%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'center',
    },

    right_item: {
        width: '30%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
    },

    user_name: {
        color: '#444444',
        //fontFamily: 'Muli',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 20,
        marginBottom: 3,
    },
    
    user_name_active: {
        color: '#1B75BC',
       // fontFamily: 'Muli',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 20,
        marginBottom: 3,
    },

    last_message: {
        color: '#838282',
        fontFamily: 'MULI',
        fontSize: 14,
        lineHeight: 13,
        marginBottom: 5,
        marginTop: 3,
    },

    date_time: {
        color: '#999999',
      //  fontFamily: 'MULI',
        fontSize: 12,
        lineHeight: 22,
        marginBottom: 5,
    },

    date_time_active: {
        color: '#1B75BC',
       // fontFamily: 'MULI',
        fontSize: 12,
        lineHeight: 22,
    },


    message_count: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#1B75BC',
        justifyContent: 'center',
        alignItems: 'center',
    },

    message_count_text: {
        color: '#FFFFFF',
      //  fontFamily: 'Muli',
        fontSize: 13,
        fontWeight: 'bold',
        lineHeight: 17,
        textAlign: 'center',
    },
}

export default Style