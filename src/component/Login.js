import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setLoginInformation, login } from '../actions';
import LoginPic from '../image/Login.jpg';
import D2L from '../D2L/valence';
import { Button } from '@material-ui/core';

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            login: null,
        }
    }
    responseGoogle = async (response) => {
        await this.props.dispatch(setLoginInformation(response));
        if (this.props.loginInformation.Rt.Bu.includes("@mylaurier.ca")) {
            this.setState({ login: true });
            this.props.dispatch(login(true));
        }
    }

    test = () => {

        const applicationContext = new this.d2l.ApplicationContext("localhost", "31brpbcCLsVim_K4jJ8vzw", "sagYSTT_HOts39qrGQTFWA");
        // console.log(D2L.ApplicationContext.createUrlForAuthentication("http://localhost", 3000, "http://localhost:3000"));

    }

    render() {
        const style = {
            img: {
                width: '100vw',
                height: '100vh',
                overflowY: 'hidden',
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '-1',
            },
            whiteBox: {
                width: '100vw',
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,0.3)',
                height: '50%',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                textAlign:'center',
            },
            title: {
                color: 'black',
                textTransform:'uppercase',
                letterSpacing:'20px',
                fontSize:'50px',
                fontFamily: "'Raleway', sans-serif",
                textAlign:'center',
                marginTop:'15vh',
            },
            subtitle: {
                color: 'black',
                textTransform:'uppercase',
                letterSpacing:'10px',
                fontSize:'20px',
                fontFamily: "'Raleway', sans-serif",
                textAlign:'center',
                margin:'0',
            },
            loginbth:{
                backgroundColor:'rgba(0,0,0,0.8)',
                color:'white',
                fontSize:'17px',
                padding: '15px 80px',
                fontFamily: "'Raleway', sans-serif",
                textAlign:'center',
                borderRadius:'80px',
                marginTop:'40px',
                wordSpacing:'1px',
            }
        }
        return (
            <div style={style.body}>
                <img src={LoginPic} style={style.img} />
                <div style={style.whiteBox}>
                    <p style={style.title}>My Grading Space</p>
                    <p style={style.subtitle}>Eazy Your Grading Life owo</p>
                    <button style={style.loginbth}>Click Here to Login</button>
                </div>
                
                <Button onClick={this.test}>haha</Button>
                <GoogleLogin
                    clientId="782461757059-f5lr975a382rf04vgnu9vde71bjcfpdv.apps.googleusercontent.com"
                    render={renderProps => ( <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Login</button>)}
                    onSuccess={this.responseGoogle}
                    // onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                {!this.props.login && (<div>You have to login with your laurier account</div>)}
            </div>
        );
    }

}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    setLoginInformation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loginInformation: state.loginInformation,
    login: state.login,
});

export default connect(mapStateToProps)(Login);