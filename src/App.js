import React, { Component } from 'react';
import './App.css';
import Layout from './layouts/BasicLayout';
import Draft from './pages/draft/index'
import { Provider } from 'react-redux'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'

import store from './store/reducer'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

@withRouter
class App extends Component {
  state = {
    user: null
  }
  checkToken () {
    // if (this.props.location.pathname != '/login') {
    //   if (!Cookies.get('JSESSIONID')) {
    //     this.props.history.replace('/login')
    //   }
    // } else {
    //   if (Cookies.get('JSESSIONID')) {
    //     this.props.history.replace('/home')
    //   }
    // }
  }
  componentWillMount () {
    this.setState({
      user: store.getState().user
    })
  }
  componentWillReceiveProps () {
    // this.checkToken()
  }
  render () {
    const { user } = this.state
    const AuthComponent = ({component: Component}, ...rest) => {
      return (
        <Route
          { ...rest }
          render={ props =>
            user ? (
              <Component { ...props } />
            ) : (
                <Redirect
                  to={ {
                    pathname: "/",
                    state: { from: props.location }
                  } }
                />
              )
          }
        />
      )
    }
    return (
      <Provider store={ store }>
        <Switch>
          <AuthComponent path="/drafts"
            component={ Draft } />
          <Route path="/" component={ Layout } />
        </Switch>
      </Provider>
    );
    }
  }

  export default App;
