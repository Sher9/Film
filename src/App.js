import React, {Component} from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {
    Easing,
    Animated
} from 'react-native'

import Icon from "react-native-vector-icons/Ionicons"

import HotList from './components/HotList';
import Seek from './components/Seek';
import Mine from './components/Mine';
import Detail from './components/Detail';
import Search from './components/Search';
import Login from './common/Login';

const BottomTab = createBottomTabNavigator({
    MovieList: {
        screen: HotList,
        navigationOptions: {
            tabBarLabel: '热映',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-laptop" size={20} color={tintColor}/>
            ),
        },
    },
    Seek: {
        screen: Seek,
        navigationOptions: {
            tabBarLabel: '找片',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-eye" size={20} color={tintColor}/>
            ),
        },
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-person" size={20} color={tintColor}/>
            ),
        },
    }
}, {
    tabBarOptions: {
        activeTintColor: '#494949',// 文字和图片选中颜色
        inactiveTintColor: '#999999',// 文字和图片未选中颜色
        labelStyle: {
            fontSize: 12,
            marginBottom: 5,
        },
        style: {
            borderTopWidth: 1,
            borderTopColor: '#c3c3c3',
            height: 50,
            backgroundColor: '#fff'
        },
    }

});

const MyApp = createStackNavigator({
    Home: {
        screen: BottomTab,
        navigationOptions: {
            header: null
        }
    },
    Detail,
    Search,
    Login
}, {
    headerMode: 'screen',//导航栏的显示模式:  float: 无透明效果, 默认  screen: 有渐变透明效果, 如微信QQ的一样 none: 隐藏导航栏
    mode: 'modal',//页面切换模式:card: 普通app常用的左右切换 modal: 上下切换
    navigationOptions: {
        gesturesEnabled: false,// 是否允许右滑返回，在iOS上默认为true，在Android上默认为false
    },
    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const {layout, position, scene} = sceneProps;
            const {index} = scene;

            const width = layout.initWidth;
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });

            return {opacity, transform: [{translateX}]};
        },
    }),
});
export default MyApp
