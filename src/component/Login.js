import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setLoginInformation } from '../actions';

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            login: null,
        }
    }
    responseGoogle = (response) => {
        this.props.setLoginInformation(response);
        if (response.Rt.Bu.includes("@mylaurier.ca")) this.setState({ login: true });
    }


    render() {
        return (
            <div>
                <GoogleLogin
                    clientId="782461757059-f5lr975a382rf04vgnu9vde71bjcfpdv.apps.googleusercontent.com"
                    render={renderProps => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Login</button>
                    )}
                    onSuccess={this.responseGoogle}
                    // onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                {!this.state.login && (<div>You have to login with your laurier account</div>)}
            </div>
        );
    }

}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    setLoginInformation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loginInformation: state.loginInformation
});

export default connect(mapStateToProps)(Login);