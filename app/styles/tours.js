import {Dimensions, StyleSheet} from "react-native";

const dimensions = Dimensions.get('window');
const windowHeight = Math.round(dimensions.width * 9 / 16);
const windowWidth = dimensions.width;

export default StyleSheet.create({
    item: {

        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        overflow: 'hidden'
    },
    tourPriceBtnContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderTopWidth: .5,
        borderColor:'#666',
        backgroundColor:'#eee'
    },

    orderAddBtn:{
        backgroundColor: "green",
        paddingTop: 5,
        paddingLeft:9,
        paddingRight:9,
        margin: 5,
        width:30,
        height:30,
        borderRadius: 50,
        textAlign:"center"
    },
    orderRemoveBtn:{
        backgroundColor: "red",
        paddingTop: 5,
        paddingLeft:9,
        paddingRight:9,
        margin: 5,
        width:30,
        height:30,
        borderRadius: 50,
        textAlign:"center"
    },
    img: {
        height: 180,
        resizeMode:'cover'
    },
    title: {
        fontSize: 18,
        fontWeight:"bold",
        marginTop:6,
        marginBottom:6,
        marginLeft:4,
        marginRight:4
    },
    name:{
        fontSize: 15,
        // fontWeight: 'bold',
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
    },
    value:{
        fontSize:14,
        marginRight: 10,
        marginTop: 5,
        color:"#666"
    },
    dayBox: {
        borderTopWidth: .5,
        borderColor: "#999",
        backgroundColor:"#f7f7f7",
        padding:10
    },
    orderFormHolder:{
            padding:10,
            backgroundColor:"#fafafa"
    },
    orderFormInput:{
        textAlign: 'right',
        borderColor:"#ccc",
        borderBottomWidth: 1,
        borderRadius:3,
        margin:5,
        padding:10
    },
    orderTourSummery:{
        padding:10
    }
});
