import React, { Component } from 'react';
import {AppRegistry ,YellowBox} from 'react-native';
import App from './src/App';
import { Provider } from 'react-redux';
import configureStore from './src/store';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const store = configureStore();

class Root extends Component {

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('Film', () => Root);
