import {createStackNavigator} from "react-navigation-stack";
import * as profile from "../../screens/profile";

const ProfileNavigator = createStackNavigator(profile, {
    defaultNavigationOptions:{header: null}
});
export default ProfileNavigator;