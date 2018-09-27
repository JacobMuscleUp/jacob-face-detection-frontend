import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';

require('dotenv').config();

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errMsgIsOn: false
    }
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value });
  }

  onUserSignIn = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER}/users/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    });
    const user = await res.json();
    if (user.id) {
      this.props.loadUser(user);
      this.props.onRouteChange('home');
    } else {
      this.setState({ errMsgIsOn: true});
    }
  }

  toggleErrMsg = () => {
    this.setState({ errMsgIsOn: !this.state.errMsgIsOn });
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input
                    onChange={this.onEmailChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address" />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input
                    onChange={this.onPasswordChange}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password" />
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={this.onUserSignIn}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in" />
              </div>
              <div className="lh-copy mt3">
                <a onClick={() => onRouteChange('signup')} className="f6 link dim black db">Sign up</a>
              </div>
            </div>
          </main>
        </article>
        <Modal isOpen={this.state.errMsgIsOn} toggle={this.toggleErrMsg}>
          <ModalHeader toggle={this.toggleErrMsg}>Failed to signin because of wrong email or password</ModalHeader>
        </Modal>
      </div>
    );
  }
}

export default Signin;