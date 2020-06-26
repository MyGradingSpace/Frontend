import React from 'react';
import GoogleLogin from 'react-google-login';

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            loginData: '',
            login: null,
        }
    }
    responseGoogle = (response) => {
        console.log(response);
        this.setState({ loginData: response });
        if(response.Rt.Bu.includes("@mylaurier.ca")) this.setState({ login: true });
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
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                {!this.state.login && (<div>You have to login with your laurier account</div>)}
            </div>
        );
    }

}

export default Login;