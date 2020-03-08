import {createStackNavigator} from "react-navigation-stack";
import * as tours from "../../screens/tours";

const TourNavigator = createStackNavigator(tours, {
    defaultNavigationOptions:{header: null}
});
export default TourNavigator;