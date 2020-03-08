import React ,{Fragment} from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,

} from 'react-native';
import HTML from 'react-native-render-html';
import {globalStyles, TourStyles} from '../../styles';
import TextIranSans from "../TextIranSans";
import i18n from "../I18n";
import { connect } from 'react-redux';
import moment from "jalali-moment";
import {commafy,convertDigit} from "../../components/helpers";
import {SvgUri} from 'react-native-svg'
const mapStateToProps = (state) => {
    return {
        settings:state.settings,
        user:state.user
    };
};
class item extends React.Component {
    constructor(props){
        super(props);
    }

    static renderItinerary(itinerary, index){
        const days=['first','second','third','forth','fifth','sixth','seventh','eighth','ninth','tenth'];
        return(
            <View style={TourStyles.dayBox}>
                <TextIranSans style={TourStyles.name}>{i18n.t('day')} {i18n.t(days[index])}</TextIranSans>
                <View>
                    <TextIranSans style={TourStyles.value}>
                        {i18n.t('departure_time')} {convertDigit(itinerary.departure_time_first,'e2p')} {i18n.t('from')} {itinerary.place_of_departure}
                    {/*<i class="fas fa-long-arrow-alt-left" style="max-height: 10px"></i>*/}
                    </TextIranSans>
                    <TextIranSans style={TourStyles.value}>
                        {i18n.t('arrive_to')} {itinerary.place_of_arrival} {i18n.t('arrival_time')} {convertDigit(itinerary.arrival_time_first,'e2p')}
                    </TextIranSans>
                    <TextIranSans style={TourStyles.value}>
                    {/*<i class="fas fa-long-arrow-alt-left" style="max-height: 10px"></i>*/}
                    اجرای برنامه تور
                    {/*<i class="fas fa-long-arrow-alt-left" style="max-height: 10px"></i>*/}
                    </TextIranSans>
                    <TextIranSans style={TourStyles.value}>ساعت {convertDigit(itinerary.departure_time_end,'e2p')} برگشت از برنامه تور</TextIranSans>
                    <TextIranSans style={TourStyles.name}>{i18n.t('description')}</TextIranSans>
                    <TextIranSans style={TourStyles.value}> {itinerary.description_1}</TextIranSans></View>
            </View>
        )
    }
    render() {
        return (
            <ScrollView>
                <Image  style={TourStyles.img} source={{uri:'https://www.bacharkh.com/image/tour/'+this.props.data.image}} />

                <View><TextIranSans style={TourStyles.title}>{this.props.data.title}</TextIranSans></View>
                {/*<TextIranSans style={TourStyles.name}>{i18n.t('leader')}</TextIranSans><TextIranSans style={TourStyles.value}>{this.props.data.user.first_name_fa} {this.props.data.user.last_name_fa}</TextIranSans>*/}
                <View style={[globalStyles.flexRow]}>
                    <View style={[globalStyles.flex1]}><TextIranSans >{i18n.t('source')}</TextIranSans><Text style={[TourStyles.title,{fontWeight: 'normal'}]}>{this.props.data.source_city}</Text></View>
                    <View style={[globalStyles.flex1]}><TextIranSans >{i18n.t('destination')}</TextIranSans><Text style={[TourStyles.title,{fontWeight: 'normal'}]}>{this.props.data.destination_city}</Text></View>
                </View>
                <View style={[globalStyles.flexRow]}>
                    <View style={[globalStyles.flex1]}><TextIranSans >{i18n.t('start_date')}</TextIranSans><Text style={[TourStyles.title,{fontWeight: 'normal',textAlign:'right'}]}>{convertDigit(moment(this.props.data.start_date).locale(this.props.settings.locale).format('YYYY/MM/DD'),'e2p')}</Text></View>
                    <View style={[globalStyles.flex1]}><TextIranSans >{i18n.t('end_date')}</TextIranSans><Text style={[TourStyles.title,{fontWeight: 'normal',textAlign:'right'}]}>{convertDigit(moment(this.props.data.end_date).locale(this.props.settings.locale).format('YYYY/MM/DD'),'e2p')}</Text></View></View>
                <View><TextIranSans style={TourStyles.name}>{i18n.t('category')} </TextIranSans><TextIranSans style={TourStyles.value}>{i18n.t(this.props.data.category)}</TextIranSans></View>
                <View><TextIranSans style={[TourStyles.name]}>{i18n.t('equipment')}</TextIranSans><TextIranSans style={TourStyles.value}>کلاه دوچرخه سواری، دستکش ، قمقمه، {convertDigit(this.props.data.equipment,'e2p')}</TextIranSans></View>
                <View style={[globalStyles.flexRow]}>
                    <View style={[globalStyles.flex1]}>
                    <TextIranSans style={TourStyles.name}>{i18n.t('hardship_level')}</TextIranSans>
                    <View style={[globalStyles.flexRow]}><SvgUri style={{marginRight:5}} width='40' height='40'
                                                                 uri={'https://www.bacharkh.com/image/tours/' + this.props.data.hardship_level + '.svg'}/></View>
                    </View>
                    <View style={[globalStyles.flex1]}>
                        <TextIranSans style={TourStyles.name}>{i18n.t('route_attribute')}</TextIranSans>
                        <TextIranSans style={TourStyles.value}>{i18n.t('route_attribute_'+this.props.data.route_attribute)}</TextIranSans>
                    </View>
                </View>

                <View>
                    <TextIranSans style={TourStyles.name}>{"\n"}{i18n.t('itinerary')}</TextIranSans>
                    <View  style={{borderBottomWidth: .5, borderColor: "#999", backgroundColor:"#f7f7f7",}}>{this.props.data.itineraries && this.props.data.itineraries.map((itinerary,index) => item.renderItinerary(itinerary,index))}</View>
                </View>
                <View  style={[{marginTop:5,marginBottom:5,paddingTop:10,paddingBottom:10}]}>
                    <TextIranSans style={TourStyles.name}>{i18n.t('services')}</TextIranSans>
                    <View style={[{paddingLeft:20,paddingRight:20}]}>
                        {this.props.data.services && this.props.data.services.map((service,index) => {
                            return (<TextIranSans style={[TourStyles.value]}>{service.name_fa}</TextIranSans>)
                        })}
                        {this.props.data.extra_services && <TextIranSans style={[TourStyles.value]}>{this.props.data.extra_services}</TextIranSans>}
                    </View>
                </View>
                <View><HTML html={this.props.data.content} containerStyle={{margin:5}} baseFontStyle={{fontFamily: "IRANSansMobile",textAlign:"right"}}/></View>
            </ScrollView>
        );
    }
}


// export default item;
export default connect(mapStateToProps)(item);

