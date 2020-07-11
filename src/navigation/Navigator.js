import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerActions } from 'react-navigation-drawer';

//import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import Category from '../components/catalog/Category';
import CategoryTree from '../components/catalog/CategoryTree';
import CategoryTreeHz from '../components/catalog/CategoryTreeHz';
import Product from '../components/catalog/Product';
import Cart from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';
import Login from '../components/account/Login';
import Signin from '../components/account/Signin';
import Account from '../components/account/Account';
import AuthLoading from '../components/account/AuthLoading';
import PasswordReset from '../components/account/PasswordReset';
import HomeScreen from '../components/home/HomeScreen';
//import HomeScrollCategory from '../components/home/HomeScrollCategory';
//import SearchBarHome from '../components/search/SearchBarHome';
import SearchScreen from '../components/search/SearchScreen';
import OrdersScreen from '../components/account/OrdersScreen';
import OrderScreen from '../components/account/OrderScreen';
import AddressScreen from '../components/account/AddressScreen';
import DrawerScreen from '../components/catalog/DrawerScreen';
import OfferScreen from '../components/offers/OfferScreen';
import { Image } from 'react-native';

//import CartBadge from '../components/cart/CartBadge';

import * as routes from './routes';

import { theme } from '../theme';
import { ProductScreen } from '../components/catalog/ProductScreen';
//import { SearchBar } from 'react-native-elements';

const defaultHeader = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTitleStyle: {
    ...theme.typography.titleTextSemiBold,
    alignSelf: 'center',
  },
  headerBackTitle: null,
  headerTintColor: theme.colors.appbarTint,
};

const HomeStack = createStackNavigator(
  {
    [routes.NAVIGATION_HOME_SCREEN_PATH]: HomeScreen,
    [routes.NAVIGATION_CATEGORY_PATH]: Category,
    [routes.NAVIGATION_HOME_PRODUCT_PATH]: Product,
    [routes.NAVIGATION_SEARCH_SCREEN_PATH]: SearchScreen,
    [routes.NAVIGATION_HOME_PRODUCT_PATH]: ProductScreen,
    [routes.NAVIGATION_CART_PATH]: Cart,
    [routes.NAVIGATION_CATEGORY_TREE_PATH]: CategoryTree,
  },
  {
    initialRouteName: routes.NAVIGATION_HOME_SCREEN_PATH,
    navigationOptions: defaultHeader,
  },
);

const AuthStack = createStackNavigator({
  [routes.NAVIGATION_LOGIN_PATH]: Login,
  [routes.NAVIGATION_SIGNIN_PATH]: Signin,
  [routes.NAVIGATION_RESET_PASSWORD_PATH]: PasswordReset,
}, {
  navigationOptions: defaultHeader,
});

const AccountStack = createStackNavigator({
  [routes.NAVIGATION_ACCOUNT_PATH]: Account,
  [routes.NAVIGATION_ORDERS_PATH]: OrdersScreen,
  [routes.NAVIGATION_ORDER_PATH]: OrderScreen,
  [routes.NAVIGATION_ADDRESS_SCREEN_PATH]: AddressScreen,
}, {
  navigationOptions: defaultHeader,
});

const AccountSwitch = createSwitchNavigator({
  [routes.NAVIGATION_AUTH_LOADING_SWITCH]: AuthLoading,
  [routes.NAVIGATION_LOGIN_STACK_PATH]: AuthStack,
  [routes.NAVIGATION_ACCOUNT_STACK_PATH]: AccountStack,
});

const SearchStack = createStackNavigator({
  //[routes.NAVIGATION_CATEGORY_PATH]: Category,
  [routes.NAVIGATION_CATEGORY_PATH]: SearchScreen,
  [routes.NAVIGATION_SEARCH_PRODUCT_PATH]: Product,
}, {
  navigationOptions: defaultHeader,
});

const OfferStack = createStackNavigator({
  [routes.NAVIGATION_OFFER_NAVIGATOR]: OfferScreen,
  //[routes.NAVIGATION_SEARCHBAR_NAVIGATOR]: SearchBarHome,
  //[routes.NAVIGATION_CATEGORY_TREE_HZ_PATH]: CategoryTreeHz,
}, {
  navigationOptions: defaultHeader,
});

const CategoryStack = createStackNavigator({
  [routes.NAVIGATION_CATEGORY_TREE_PATH]: CategoryTree,
  [routes.NAVIGATION_SEARCH_PRODUCT_PATH]: Product,
  [routes.NAVIGATION_CATEGORY_PATH]: Category,
}, {
  navigationOptions: defaultHeader,
});

const MainAppNavigator = createBottomTabNavigator(
  {
    [routes.NAVIGATION_HOME_STACK_PATH]: {
      screen: HomeStack,
      navigationOptions: () => ({
        //tabBarIcon: ({ tintColor }) => <Icon1 name="home" size={30}  color={tintColor} />,
        tabBarIcon: ({ tintColor }) => <Image source={require('../../resources/icons/home-icon.png')} color={tintColor} />,
      }),
    },
    /*[routes.NAVIGATION_SEARCH_SCREEN_PATH]: {
      screen: SearchStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => <Image source={require('../../resources/icons/search-icon.png')} color={tintColor} />,
      }),
    },*/
    [routes.NAVIGATION_CATEGORY_TREE_PATH]: {
      screen: CategoryStack,
      //navigationOptions: { header: null },
      navigationOptions: () => ({
        //tabBarIcon: ({ tintColor }) => <Icon1 name="th-large" size={30} color={tintColor} />,
        tabBarIcon: ({ tintColor }) => <Image source={require('../../resources/icons/category-icon.jpg')} color={tintColor} />,
      }),
    },

    [routes.NAVIGATION_OFFER_NAVIGATOR]: {
      screen: OfferStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => <Image source={require('../../resources/icons/offer-icon.png')} color={tintColor} />,
      }),
    },

    [routes.NAVIGATION_AUTH_STACK_PATH]: {
      screen: AccountSwitch,
      navigationOptions: () => ({
        //tabBarIcon: ({ tintColor }) => <Icon2 name="account" size ={30} color={tintColor} />,
        tabBarIcon: ({ tintColor }) => <Image source={require('../../resources/icons/myaccount-icon.jpg')} color={tintColor} />,
      }),
    },
    /*[routes.NAVIGATION_CART_PATH]: {
      screen: CartStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => <Image source={require('../../resources/icons/cart-icon.png')} color={tintColor} />,
      }),
    },*/
  },
  {
    //initialRouteName: NAVIGATION_AUTH_STACK_PATH,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: theme.colors.secondary,
      inactiveTintColor: theme.colors.tabBarIconInactive,
      activeBackgroundColor: theme.colors.tabBarBackground,
      inactiveBackgroundColor: theme.colors.tabBarBackground,
    },
  },
);

const Drawer = createDrawerNavigator({
  [routes.BOTTOM_TAB_NAVIGATOR]: {
    screen: MainAppNavigator,
  },
  [routes.NAVIGATION_DRAWER_SCREEN]: {
    screen: DrawerScreen,
    navigationOptions: { header: null },
  },
}, {
  //contentComponent: CategoryTree,
});

const DrawerNavigator = createDrawerNavigator(
  {
    Drawer,
  },
  {
    contentComponent: DrawerScreen,
    getCustomActionCreators: (route, stateKey) => ({
      toggleFilterDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
    }),
  },
);

const Nav = createStackNavigator({
  [routes.NAVIGATION_DRAWER_NAVIGATOR]: {
    screen: DrawerNavigator,
    navigationOptions: { header: null },
  },
  [routes.NAVIGATION_CHECKOUT_PATH]: Checkout,
}, {
  headerBackTitleVisible: false,
});

export const Navigator = createAppContainer(Nav);
