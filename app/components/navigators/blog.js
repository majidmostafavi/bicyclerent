import {createStackNavigator} from "react-navigation-stack";
import * as blog from "../../screens/profile";

let BlogNavigator = createStackNavigator(blog, {
    defaultNavigationOptions:{header: null}
});
export default BlogNavigator;