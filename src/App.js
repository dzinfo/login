import UserStore from './stores/UserStore';
import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm.components';
import SubmitButton from './components/SubmitButton.components';
import InputField from './components/InputField.components';
import { observer } from 'mobx-react'


class App extends React.Component {


  async componentDidMount() {
    try {
      let res = await fetch('/isLoggedIn', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })

      let result = await res.json();
      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }


  async doLogout() {
    try {
      let res = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })

      let result = await res.json();
      if (result && result.success) {
        UserStore.username = '';
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="App">
          YESSSS
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="App">
            WELCOM XXXXX
            <SubmitButton text={'Log out'} disabled={false} onClick={() => this.doLogout()} />
          </div>
        );
      } else {
        return (
          <div className="App">
            <LoginForm />
          </div>
        );
      }
    }
  }


}

export default observer(App);
