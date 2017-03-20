import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './utils/bootstrap.min.css';
import AppHeader from './component/AppHeader.js';
import AppInfo from './component/AppInfo.js';
import ApolloClient, {createNetworkInterface} from 'apollo-client';

import {ApolloProvider} from 'react-apollo';

const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8080/graphql',
    opts: {
        //headers : 'Access-Control-Allow-Origin',
        credentials: 'same-origin',
        // mode: 'no-cors',
    }
});

const myClient = new ApolloClient({
    networkInterface,
});

class App extends Component {
    // 构造函数
    constructor(...args) {
        super(...args);
        this.client = myClient;
    }

    render() {

        return (
            <ApolloProvider client={this.client}>
                <div className="App">
                    <div className="Header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>My-Todo</h2>
                    </div>
                    <AppHeader />
                    <AppInfo />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
